const Department = require('../models/Department');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const Timetable = require('../models/Timetable');
const LeaveRequest = require('../models/LeaveRequest');
const { sendSuccess, sendError } = require('../utils/response');
const { applyLeaveToTimetable, removeLeaveFromTimetable } = require('../services/leave.service');

exports.getDashboard = async (req, res) => {
  try {
    const [totalDepts, totalFaculty, totalStudents, pendingLeaves] = await Promise.all([
      Department.countDocuments(), Faculty.countDocuments({ isTerminated: { $ne: true } }),
      Student.countDocuments(),
      LeaveRequest.countDocuments({ requesterRole: 'hod', status: 'pending' }),
    ]);
    sendSuccess(res, { stats: { totalDepts, totalFaculty, totalStudents, pendingLeaves } });
  } catch (err) { sendError(res, err.message); }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('hodId', 'fullName').lean();
    sendSuccess(res, { departments });
  } catch (err) { sendError(res, err.message); }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id).populate('hodId', 'fullName designation');
    if (!dept) return sendError(res, 'Department not found', 404);
    const faculty = await Faculty.find({ departmentId: dept._id, isTerminated: { $ne: true } }).lean();
    const students = await Student.countDocuments({ departmentId: dept._id });
    sendSuccess(res, { department: dept, faculty, studentCount: students });
  } catch (err) { sendError(res, err.message); }
};

exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ isTerminated: { $ne: true } })
      .populate('departmentId', 'name fullName')
      .populate('userId', 'username email role')
      .lean();
    sendSuccess(res, { faculty });
  } catch (err) { sendError(res, err.message); }
};

// GET /api/v1/principal/ex-employees
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

exports.getStudents = async (req, res) => {
  try {
    const { search, department } = req.query;
    const filter = {};
    if (department) {
      const dept = await Department.findOne({ name: department.toUpperCase() });
      if (dept) filter.departmentId = dept._id;
    }
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { registerNumber: { $regex: search, $options: 'i' } },
      ];
    }
    const students = await Student.find(filter).populate('departmentId', 'name fullName').sort({ createdAt: -1 }).lean();
    sendSuccess(res, { students });
  } catch (err) { sendError(res, err.message); }
};

// GET /api/v1/principal/timetable — view all departments' timetables
exports.getTimetable = async (req, res) => {
  try {
    const { department, year, section, type } = req.query;
    const filter = {};
    if (department) filter.department = department.toUpperCase();
    if (year) filter.year = parseInt(year);
    if (section) filter.section = section.toUpperCase();
    if (type) filter.type = type;

    const timetables = await Timetable.find(filter)
      .populate('departmentId', 'name fullName')
      .sort({ createdAt: -1 })
      .lean();
    sendSuccess(res, { timetables });
  } catch (err) { sendError(res, err.message); }
};

// HOD leave requests → Principal approves/rejects
exports.getLeaveRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ requesterRole: 'hod' }).sort({ createdAt: -1 }).lean();
    sendSuccess(res, { leaveRequests: leaves });
  } catch (err) { sendError(res, err.message); }
};

exports.reviewLeaveRequest = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) return sendError(res, 'Status must be approved or rejected', 400);

    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return sendError(res, 'Leave request not found', 404);
    if (leave.requesterRole !== 'hod') return sendError(res, 'Only HOD leave requests can be reviewed here', 400);

    leave.status = status;
    leave.reviewedBy = req.user._id;
    leave.reviewedAt = new Date();
    await leave.save();

    if (status === 'approved') {
      const facultyDoc = await Faculty.findOne({ userId: leave.requesterId });
      if (facultyDoc) await applyLeaveToTimetable(leave, facultyDoc);
    } else {
      await removeLeaveFromTimetable(leave._id);
    }

    sendSuccess(res, { message: `Leave request ${status}`, leaveRequest: leave });
  } catch (err) { sendError(res, err.message); }
};

exports.getProfile = async (req, res) => {
  try { sendSuccess(res, { user: req.user }); }
  catch (err) { sendError(res, err.message); }
};
