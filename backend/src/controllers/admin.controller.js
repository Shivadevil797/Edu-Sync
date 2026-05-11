const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const FacultyWorkload = require('../models/FacultyWorkload');
const Timetable = require('../models/Timetable');
const { sendSuccess, sendError } = require('../utils/response');
const { encrypt, decrypt, generatePassword, generateUsername } = require('../services/credential.service');
const { parseStaffFile, bulkImportStaff } = require('../services/bulkImport.service');
const { parseWorkloadFile, generateTimetables } = require('../services/timetable.service');
const { generateRegisterNumber } = require('../services/registerNumber.service');

// GET /api/v1/admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const [totalStudents, totalFaculty, totalDepartments, totalHODs] = await Promise.all([
      Student.countDocuments(), Faculty.countDocuments(),
      Department.countDocuments(), Faculty.countDocuments({ isHOD: true }),
    ]);
    sendSuccess(res, { stats: { totalStudents, totalFaculty, totalDepartments, totalHODs } });
  } catch (err) { sendError(res, err.message); }
};

// ───── STAFF MANAGEMENT ─────

// GET /api/v1/admin/staff — list with search, filter, sort + decrypted credentials
exports.getStaff = async (req, res) => {
  try {
    const { search, department, sort, page = 1, limit = 20 } = req.query;
    const filter = { isTerminated: { $ne: true } };
    if (department) {
      const dept = await Department.findOne({ name: department.toUpperCase() });
      if (dept) filter.departmentId = dept._id;
    }
    if (search) filter.fullName = { $regex: search, $options: 'i' };

    const sortObj = sort === 'name' ? { fullName: 1 } : sort === 'dept' ? { departmentId: 1 } : { createdAt: -1 };
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [staff, total] = await Promise.all([
      Faculty.find(filter).populate('departmentId', 'name fullName').populate('userId', 'username email role').sort(sortObj).skip(skip).limit(parseInt(limit)).lean(),
      Faculty.countDocuments(filter),
    ]);

    // Decrypt passwords for admin view
    const staffWithCreds = await Promise.all(staff.map(async (s) => {
      let password = '';
      if (s.userId) {
        const userWithPw = await User.findById(s.userId._id || s.userId).select('+passwordPlain').lean();
        if (userWithPw?.passwordPlain) {
          try { password = decrypt(userWithPw.passwordPlain); } catch { password = '[encrypted]'; }
        }
      }
      return { ...s, credentials: { username: s.userId?.username || '', password } };
    }));

    sendSuccess(res, { staff: staffWithCreds, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) { sendError(res, err.message); }
};

// POST /api/v1/admin/staff — create single staff
exports.createStaff = async (req, res) => {
  try {
    const { fullName, email, phone, department, designation, qualification, isHOD } = req.body;
    if (!fullName || !email) return sendError(res, 'Full name and email are required', 400);

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return sendError(res, 'Email already exists', 409);

    let dept = await Department.findOne({ name: (department || 'BCA').toUpperCase() });
    if (!dept) {
      const isBCA = (department || 'BCA').toUpperCase() === 'BCA';
      dept = await Department.create({ name: (department || 'BCA').toUpperCase(), fullName: department || 'BCA', weeklyHoursRule: isBCA ? 20 : 16, labHoursRule: isBCA ? 12 : 0, theoryHoursRule: isBCA ? 8 : 16 });
    }

    const existingUsers = await User.find({}, 'username').lean();
    const username = generateUsername(fullName, existingUsers.map(u => u.username));
    const rawPassword = generatePassword();

    const user = await User.create({ username, email: email.toLowerCase(), passwordHash: rawPassword, passwordPlain: encrypt(rawPassword), role: isHOD ? 'hod' : 'faculty' });
    const faculty = await Faculty.create({ userId: user._id, employeeId: `EMP-${Date.now()}`, fullName, designation: designation || 'Assistant Professor', qualification, departmentId: dept._id, phone, isHOD: !!isHOD, weeklyHours: dept.weeklyHoursRule, labHours: dept.labHoursRule, theoryHours: dept.theoryHoursRule });

    if (isHOD) { dept.hodId = faculty._id; await dept.save(); }
    dept.totalFaculty = await Faculty.countDocuments({ departmentId: dept._id });
    await dept.save();

    sendSuccess(res, { message: 'Staff created', faculty, credentials: { username, password: rawPassword } }, 201);
  } catch (err) { sendError(res, err.message); }
};

// POST /api/v1/admin/staff/bulk-import
exports.bulkImportStaff = async (req, res) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const records = await parseStaffFile(req.file.path);
    if (!records.length) return sendError(res, 'No valid records found in file', 400);
    if (records.length > 500) return sendError(res, 'Max 500 rows per upload', 400);

    const result = await bulkImportStaff(records);
    sendSuccess(res, { message: `Imported ${result.imported} staff, skipped ${result.skipped}`, ...result }, 201);
  } catch (err) { sendError(res, err.message); }
};

// PUT /api/v1/admin/staff/:id
exports.updateStaff = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('departmentId', 'name');
    if (!faculty) return sendError(res, 'Staff not found', 404);
    sendSuccess(res, { faculty });
  } catch (err) { sendError(res, err.message); }
};

// DELETE /api/v1/admin/staff/:id (soft-delete → Ex-Employees)
exports.deleteStaff = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return sendError(res, 'Staff not found', 404);

    // If this faculty was HOD, clear the department's hodId
    if (faculty.isHOD && faculty.departmentId) {
      await Department.findByIdAndUpdate(faculty.departmentId, { $unset: { hodId: 1 } });
    }

    // Update department faculty count
    const dept = await Department.findById(faculty.departmentId);

    // Permanently delete the User account (frees up the email/username)
    if (faculty.userId) {
      await User.findByIdAndDelete(faculty.userId);
    }

    // Permanently delete the Faculty record
    await Faculty.findByIdAndDelete(faculty._id);

    // Update department count
    if (dept) {
      dept.totalFaculty = await Faculty.countDocuments({ departmentId: dept._id, isTerminated: { $ne: true } });
      await dept.save();
    }

    sendSuccess(res, { message: 'Staff permanently deleted' });
  } catch (err) { sendError(res, err.message); }
};

// GET /api/v1/admin/staff/ex-employees
exports.getExEmployees = async (req, res) => {
  try {
    const exEmployees = await Faculty.find({ isTerminated: true })
      .populate('departmentId', 'name fullName')
      .populate('userId', 'username email')
      .sort({ terminatedAt: -1 })
      .lean();
    sendSuccess(res, { exEmployees });
  } catch (err) { sendError(res, err.message); }
};

// ───── STUDENT MANAGEMENT ─────

exports.getStudents = async (req, res) => {
  try {
    const { search, department, semester, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (department) { const dept = await Department.findOne({ name: department.toUpperCase() }); if (dept) filter.departmentId = dept._id; }
    if (semester) filter.semester = parseInt(semester);
    if (search) filter.$or = [{ firstName: { $regex: search, $options: 'i' } }, { lastName: { $regex: search, $options: 'i' } }, { registerNumber: { $regex: search, $options: 'i' } }];

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [students, total] = await Promise.all([
      Student.find(filter).populate('departmentId', 'name fullName').sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Student.countDocuments(filter),
    ]);
    sendSuccess(res, { students, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) { sendError(res, err.message); }
};

exports.createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, department, section, yearOfJoining } = req.body;
    if (!firstName || !lastName || !email || !phone) return sendError(res, 'Required fields missing', 400);

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) return sendError(res, 'Email already exists', 409);

    let dept = await Department.findOne({ name: (department || 'BCA').toUpperCase() });
    if (!dept) return sendError(res, 'Department not found', 404);

    const pw = password || 'Student@123';
    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/[^a-z0-9.]/g, '');
    let finalUsername = username;
    let c = 1;
    while (await User.findOne({ username: finalUsername })) { finalUsername = `${username}${c}`; c++; }

    const user = await User.create({ username: finalUsername, email: email.toLowerCase(), passwordHash: pw, passwordPlain: encrypt(pw), role: 'student' });
    const joiningYear = yearOfJoining || new Date().getFullYear();
    const registerNumber = await generateRegisterNumber(dept.name, joiningYear);
    const student = await Student.create({ userId: user._id, registerNumber, firstName, lastName, phone, departmentId: dept._id, section: section || 'A', yearOfJoining: joiningYear, yearOfPassing: joiningYear + 3 });

    dept.totalStudents = await Student.countDocuments({ departmentId: dept._id });
    await dept.save();

    sendSuccess(res, { student, credentials: { username: finalUsername, password: pw } }, 201);
  } catch (err) { sendError(res, err.message); }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return sendError(res, 'Student not found', 404);
    sendSuccess(res, { student });
  } catch (err) { sendError(res, err.message); }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return sendError(res, 'Student not found', 404);
    await User.findByIdAndDelete(student.userId);
    await Student.findByIdAndDelete(req.params.id);
    sendSuccess(res, { message: 'Student deleted' });
  } catch (err) { sendError(res, err.message); }
};

// ───── TIMETABLE MANAGEMENT ─────

exports.uploadWorkload = async (req, res) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const records = await parseWorkloadFile(req.file.path);
    if (!records.length) return sendError(res, 'No valid records in file', 400);

    const workload = await FacultyWorkload.create({ uploadedBy: req.user._id, fileName: req.file.originalname, fileUrl: req.file.path, department: records[0]?.department || '', records, status: 'pending' });
    const timetableIds = await generateTimetables(workload, req.user._id);

    sendSuccess(res, { message: `Generated ${timetableIds.length} timetable(s)`, workloadId: workload._id, timetableIds }, 201);
  } catch (err) { sendError(res, err.message); }
};

exports.getWorkloads = async (req, res) => {
  try {
    const workloads = await FacultyWorkload.find().sort({ createdAt: -1 }).populate('uploadedBy', 'username').lean();
    sendSuccess(res, { workloads });
  } catch (err) { sendError(res, err.message); }
};

exports.getTimetables = async (req, res) => {
  try {
    const { department, year, section, type } = req.query;
    const filter = {};
    if (department) filter.department = department.toUpperCase();
    if (year) filter.year = parseInt(year);
    if (section) filter.section = section.toUpperCase();
    if (type) filter.type = type;

    const timetables = await Timetable.find(filter).populate('departmentId', 'name fullName').sort({ createdAt: -1 }).lean();
    sendSuccess(res, { timetables });
  } catch (err) { sendError(res, err.message); }
};

exports.updateTimetable = async (req, res) => {
  try {
    const tt = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tt) return sendError(res, 'Timetable not found', 404);
    sendSuccess(res, { timetable: tt });
  } catch (err) { sendError(res, err.message); }
};

exports.publishTimetable = async (req, res) => {
  try {
    const tt = await Timetable.findByIdAndUpdate(req.params.id, { isPublished: true }, { new: true });
    if (!tt) return sendError(res, 'Timetable not found', 404);
    sendSuccess(res, { message: 'Timetable published', timetable: tt });
  } catch (err) { sendError(res, err.message); }
};

// DELETE /api/v1/admin/timetable/:id
exports.deleteTimetable = async (req, res) => {
  try {
    const tt = await Timetable.findById(req.params.id);
    if (!tt) return sendError(res, 'Timetable not found', 404);
    await Timetable.findByIdAndDelete(req.params.id);
    // Clean up any adjusted timetable docs referencing this timetable's department+year+section
    try {
      const AdjustedTimetable = require('../models/AdjustedTimetable');
      await AdjustedTimetable.deleteMany({ departmentId: tt.departmentId, year: tt.year, section: tt.section });
    } catch { /* AdjustedTimetable model may not exist yet */ }
    sendSuccess(res, { message: 'Timetable deleted successfully' });
  } catch (err) { sendError(res, err.message); }
};

// GET /api/v1/admin/profile
exports.getProfile = async (req, res) => {
  try { sendSuccess(res, { user: req.user }); }
  catch (err) { sendError(res, err.message); }
};

// PUT /api/v1/admin/staff/:id/reset-password — Admin resets a user's password
exports.resetPassword = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return sendError(res, 'Faculty not found', 404);

    const user = await User.findById(faculty.userId).select('+passwordPlain');
    if (!user) return sendError(res, 'User account not found', 404);

    // Generate new password or use one provided by admin
    const newPassword = req.body.newPassword || generatePassword(faculty.fullName);

    user.passwordHash = newPassword; // pre-save hook will hash it
    user.passwordPlain = encrypt(newPassword);
    await user.save();

    sendSuccess(res, {
      message: 'Password reset successfully',
      credentials: { username: user.username, password: newPassword },
    });
  } catch (err) { sendError(res, err.message); }
};
