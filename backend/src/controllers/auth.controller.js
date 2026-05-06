const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Department = require('../models/Department');
const { sendSuccess, sendError } = require('../utils/response');
const { encrypt } = require('../services/credential.service');
const { generateRegisterNumber } = require('../services/registerNumber.service');

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' });
  return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: isProd, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
};

// POST /api/v1/auth/login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return sendError(res, 'Username and password are required', 400);

    const user = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email: username.toLowerCase() }],
    }).select('+passwordHash');

    if (!user) return sendError(res, 'Invalid credentials', 401);
    if (!user.isActive) return sendError(res, 'Account is deactivated', 403);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return sendError(res, 'Invalid credentials', 401);

    user.lastLogin = new Date();
    await user.save();

    // Resolve fullName from Faculty or Student record
    let fullName = user.username;
    if (['faculty', 'hod'].includes(user.role)) {
      const Faculty = require('../models/Faculty');
      const fac = await Faculty.findOne({ userId: user._id }).lean();
      if (fac) fullName = fac.fullName;
    } else if (user.role === 'student') {
      const stu = await Student.findOne({ userId: user._id }).lean();
      if (stu) fullName = `${stu.firstName} ${stu.lastName}`;
    } else if (user.role === 'admin') {
      fullName = 'Admin';
    } else if (user.role === 'principal') {
      fullName = 'Principal';
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);

    sendSuccess(res, {
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: { id: user._id, username: user.username, email: user.email, role: user.role, fullName },
    });
  } catch (err) {
    sendError(res, err.message);
  }
};

// POST /api/v1/auth/register (Student self-registration)
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, dateOfBirth, gender, department, section, yearOfJoining } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return sendError(res, 'First name, last name, email, phone, and password are required', 400);
    }

    // Check for duplicate email
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) return sendError(res, 'An account with this email already exists', 409);

    // Check for duplicate phone
    const existingPhone = await Student.findOne({ phone });
    if (existingPhone) return sendError(res, 'An account with this phone number already exists', 409);

    // Find department
    const deptName = (department || 'BCA').toUpperCase();
    let dept = await Department.findOne({ name: deptName });
    if (!dept) {
      const isBCA = deptName === 'BCA';
      dept = await Department.create({
        name: deptName, fullName: deptName,
        weeklyHoursRule: isBCA ? 20 : 16, labHoursRule: isBCA ? 12 : 0, theoryHoursRule: isBCA ? 8 : 16,
      });
    }

    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/[^a-z0-9.]/g, '');
    // Ensure unique username
    let finalUsername = username;
    let counter = 1;
    while (await User.findOne({ username: finalUsername })) {
      finalUsername = `${username}${counter}`;
      counter++;
    }

    // Create user
    const user = await User.create({
      username: finalUsername,
      email: email.toLowerCase(),
      passwordHash: password,
      passwordPlain: encrypt(password),
      role: 'student',
    });

    // Generate register number
    const joiningYear = yearOfJoining || new Date().getFullYear();
    const registerNumber = await generateRegisterNumber(dept.name, joiningYear);

    // Create student record with all fields
    const address = req.body.address || '';
    const semester = parseInt(req.body.semester) || 1;

    const student = await Student.create({
      userId: user._id,
      registerNumber,
      firstName, lastName, dateOfBirth, gender, phone,
      address,
      departmentId: dept._id,
      semester,
      section: section || 'A',
      yearOfJoining: joiningYear,
      yearOfPassing: joiningYear + 3,
    });

    dept.totalStudents = await Student.countDocuments({ departmentId: dept._id });
    await dept.save();

    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);

    sendSuccess(res, {
      message: 'Registration successful',
      accessToken, refreshToken,
      user: { id: user._id, username: user.username, email: user.email, role: 'student', fullName: `${firstName} ${lastName}` },
      student: { registerNumber: student.registerNumber, firstName, lastName },
    }, 201);
  } catch (err) {
    if (err.code === 11000) return sendError(res, 'Duplicate entry. Email or phone already registered.', 409);
    sendError(res, err.message);
  }
};

// POST /api/v1/auth/logout
exports.logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  sendSuccess(res, { message: 'Logged out successfully' });
};

// POST /api/v1/auth/refresh
exports.refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) return sendError(res, 'Refresh token required', 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) return sendError(res, 'Invalid token', 401);

    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);

    sendSuccess(res, { accessToken, refreshToken });
  } catch (err) {
    sendError(res, 'Invalid refresh token', 401);
  }
};

// GET /api/v1/auth/departments (public — for registration dropdown)
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}, 'name fullName').sort({ name: 1 }).lean();
    sendSuccess(res, { departments });
  } catch (err) {
    sendError(res, err.message);
  }
};

// POST /api/v1/auth/register-staff (Faculty/HOD self-registration)
exports.registerStaff = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, department, designation,
            qualification, gender, address, role, isClassTeacher, classSection, className } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return sendError(res, 'First name, last name, email, and password are required', 400);
    }

    const validRoles = ['faculty', 'hod'];
    const staffRole = validRoles.includes(role) ? role : 'faculty';

    // Check duplicate email
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) return sendError(res, 'An account with this email already exists', 409);

    // Find or validate department
    const deptName = (department || 'BCA').toUpperCase();
    let dept = await Department.findOne({ name: deptName });
    if (!dept) {
      return sendError(res, `Department '${deptName}' not found. Contact administrator.`, 404);
    }

    // Generate unique username
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/[^a-z0-9.]/g, '');
    let finalUsername = username;
    let counter = 1;
    while (await User.findOne({ username: finalUsername })) {
      finalUsername = `${username}${counter}`;
      counter++;
    }

    // Create user
    const user = await User.create({
      username: finalUsername,
      email: email.toLowerCase(),
      passwordHash: password,
      passwordPlain: encrypt(password),
      role: staffRole,
    });

    // Create faculty record
    const Faculty = require('../models/Faculty');
    const faculty = await Faculty.create({
      userId: user._id,
      employeeId: `EMP-${Date.now()}`,
      fullName: `${firstName} ${lastName}`,
      designation: designation || 'Assistant Professor',
      qualification,
      departmentId: dept._id,
      phone,
      isHOD: staffRole === 'hod',
      weeklyHours: dept.weeklyHoursRule || 20,
      labHours: dept.labHoursRule || 0,
      theoryHours: dept.theoryHoursRule || 16,
    });

    // Update department counts
    if (staffRole === 'hod' && !dept.hodId) {
      dept.hodId = faculty._id;
    }
    dept.totalFaculty = await Faculty.countDocuments({ departmentId: dept._id, isTerminated: { $ne: true } });
    await dept.save();

    const { accessToken, refreshToken } = generateTokens(user._id);
    setCookies(res, accessToken, refreshToken);

    sendSuccess(res, {
      message: 'Registration successful',
      accessToken, refreshToken,
      user: { id: user._id, username: user.username, email: user.email, role: staffRole, fullName: faculty.fullName },
      faculty: { employeeId: faculty.employeeId, fullName: faculty.fullName },
    }, 201);
  } catch (err) {
    if (err.code === 11000) return sendError(res, 'Duplicate entry. Email or phone already registered.', 409);
    sendError(res, err.message);
  }
};

