const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const Timetable = require('../models/Timetable');
const Syllabus = require('../models/Syllabus');
const LeaveRequest = require('../models/LeaveRequest');
const AdjustedTimetable = require('../models/AdjustedTimetable');
const { sendSuccess, sendError } = require('../utils/response');
const { applyLeaveToTimetable, removeLeaveFromTimetable } = require('../services/leave.service');

exports.getDashboard = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    if (!hodFaculty) return sendError(res, 'HOD profile not found', 404);

    const [deptFaculty, deptStudents, pendingLeaves] = await Promise.all([
      Faculty.countDocuments({ departmentId: hodFaculty.departmentId }),
      Student.countDocuments({ departmentId: hodFaculty.departmentId }),
      LeaveRequest.countDocuments({ department: hodFaculty.departmentId, requesterRole: 'faculty', status: 'pending' }),
    ]);
    sendSuccess(res, { stats: { deptFaculty, deptStudents, pendingLeaves }, department: hodFaculty.departmentId });
  } catch (err) { sendError(res, err.message); }
};

exports.getFaculty = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    if (!hodFaculty) return sendError(res, 'HOD profile not found', 404);
    const faculty = await Faculty.find({ departmentId: hodFaculty.departmentId, isTerminated: { $ne: true } })
      .populate('userId', 'username email role')
      .lean();
    sendSuccess(res, { faculty });
  } catch (err) { sendError(res, err.message); }
};

// GET /api/v1/hod/ex-employees — ex-employees in HOD's department
exports.getExEmployees = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    if (!hodFaculty) return sendError(res, 'HOD profile not found', 404);
    const exEmployees = await Faculty.find({ departmentId: hodFaculty.departmentId, isTerminated: true })
      .populate('userId', 'username email')
      .sort({ terminatedAt: -1 })
      .lean();
    sendSuccess(res, { exEmployees });
  } catch (err) { sendError(res, err.message); }
};

exports.getTimetable = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    if (!hodFaculty) return sendError(res, 'HOD profile not found', 404);
    const timetables = await Timetable.find({ departmentId: hodFaculty.departmentId }).lean();
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

exports.uploadSyllabus = async (req, res) => {
  try {
    if (!req.file) return sendError(res, 'No file uploaded', 400);
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    const syllabus = await Syllabus.create({
      departmentId: hodFaculty?.departmentId,
      title: req.body.title || req.file.originalname,
      fileUrl: req.file.path,
      uploadedBy: req.user._id,
    });
    sendSuccess(res, { syllabus }, 201);
  } catch (err) { sendError(res, err.message); }
};

exports.getSyllabi = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    if (!hodFaculty) return sendError(res, 'HOD profile not found', 404);
    const syllabi = await Syllabus.find({ departmentId: hodFaculty.departmentId }).sort({ createdAt: -1 }).lean();
    sendSuccess(res, { syllabi });
  } catch (err) { sendError(res, err.message); }
};

// Faculty leave requests → HOD approves/rejects
exports.getLeaveRequests = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    if (!hodFaculty) return sendError(res, 'HOD profile not found', 404);
    const leaves = await LeaveRequest.find({ requesterRole: 'faculty', department: hodFaculty.departmentId?.toString() }).sort({ createdAt: -1 }).lean();
    sendSuccess(res, { leaveRequests: leaves });
  } catch (err) { sendError(res, err.message); }
};

exports.reviewLeaveRequest = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) return sendError(res, 'Invalid status', 400);

    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return sendError(res, 'Leave request not found', 404);

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

    sendSuccess(res, { message: `Leave ${status}`, leaveRequest: leave });
  } catch (err) { sendError(res, err.message); }
};

// HOD's own leave request (goes to principal)
exports.requestLeave = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    const leave = await LeaveRequest.create({
      requesterId: req.user._id,
      requesterRole: 'hod',
      requesterName: hodFaculty?.fullName || req.user.username,
      department: hodFaculty?.departmentId?.toString() || '',
      leaveType: req.body.leaveType || 'Casual',
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
      approverRole: 'principal',
    });
    sendSuccess(res, { message: 'Leave request submitted', leaveRequest: leave }, 201);
  } catch (err) { sendError(res, err.message); }
};

exports.getAdjustedTimetable = async (req, res) => {
  try {
    const hodFaculty = await Faculty.findOne({ userId: req.user._id });
    if (!hodFaculty) return sendError(res, 'HOD profile not found', 404);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const adjustedTimetables = await AdjustedTimetable.find({
      departmentId: hodFaculty.departmentId,
      date: { $gte: today },
    }).populate('departmentId', 'name fullName').sort({ date: 1 }).lean();

    sendSuccess(res, { adjustedTimetables });
  } catch (err) { sendError(res, err.message); }
};
