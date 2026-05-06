const Faculty = require('../models/Faculty');
const Timetable = require('../models/Timetable');
const Syllabus = require('../models/Syllabus');
const LeaveRequest = require('../models/LeaveRequest');
const { sendSuccess, sendError } = require('../utils/response');

exports.getDashboard = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user._id }).populate('departmentId', 'name fullName');
    if (!faculty) return sendError(res, 'Faculty profile not found', 404);
    const pendingLeaves = await LeaveRequest.countDocuments({ requesterId: req.user._id, status: 'pending' });
    sendSuccess(res, { faculty, pendingLeaves });
  } catch (err) { sendError(res, err.message); }
};

exports.getTimetable = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user._id });
    if (!faculty) return sendError(res, 'Faculty profile not found', 404);

    // Match by facultyId OR by facultyName (fallback for pre-existing timetables)
    const timetables = await Timetable.find({
      $or: [
        { 'slots.facultyId': faculty._id },
        { 'slots.facultyName': { $regex: new RegExp(faculty.fullName, 'i') } },
      ],
    }).lean();

    sendSuccess(res, { timetables });
  } catch (err) { sendError(res, err.message); }
};

exports.requestLeave = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user._id });
    const leave = await LeaveRequest.create({
      requesterId: req.user._id,
      requesterRole: 'faculty',
      requesterName: faculty?.fullName || req.user.username,
      department: faculty?.departmentId?.toString() || '',
      leaveType: req.body.leaveType || 'Casual',
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
      approverRole: 'hod',
    });
    sendSuccess(res, { message: 'Leave request submitted', leaveRequest: leave }, 201);
  } catch (err) { sendError(res, err.message); }
};

exports.getLeaveRequests = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ requesterId: req.user._id }).sort({ createdAt: -1 }).lean();
    sendSuccess(res, { leaveRequests: leaves });
  } catch (err) { sendError(res, err.message); }
};

exports.getSyllabi = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user._id });
    if (!faculty) return sendError(res, 'Faculty profile not found', 404);
    const syllabi = await Syllabus.find({ departmentId: faculty.departmentId }).sort({ createdAt: -1 }).lean();
    sendSuccess(res, { syllabi });
  } catch (err) { sendError(res, err.message); }
};
