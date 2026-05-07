const Student = require('../models/Student');
const Timetable = require('../models/Timetable');
const Syllabus = require('../models/Syllabus');
const { sendSuccess, sendError } = require('../utils/response');

exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id }).populate('departmentId', 'name fullName');
    if (!student) return sendError(res, 'Student profile not found', 404);
    sendSuccess(res, { student });
  } catch (err) { sendError(res, err.message); }
};

exports.updateProfile = async (req, res) => {
  try {
    const allowed = ['phone', 'address'];
    const updates = {};
    for (const key of allowed) { if (req.body[key] !== undefined) updates[key] = req.body[key]; }

    const student = await Student.findOneAndUpdate({ userId: req.user._id }, updates, { new: true });
    if (!student) return sendError(res, 'Student not found', 404);
    sendSuccess(res, { student });
  } catch (err) { sendError(res, err.message); }
};

exports.getAcademicTimetable = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return sendError(res, 'Student not found', 404);

    const yearInCourse = student.semester ? Math.ceil(student.semester / 2) : 1;

    // Primary query: exact match on department, year, section
    let timetables = await Timetable.find({
      departmentId: student.departmentId,
      type: 'academic',
      year: yearInCourse,
      section: student.section || 'A',
    }).populate('departmentId', 'name fullName').lean();

    // Fallback 1: match department + year only (any section)
    if (timetables.length === 0) {
      timetables = await Timetable.find({
        departmentId: student.departmentId,
        type: 'academic',
        year: yearInCourse,
      }).populate('departmentId', 'name fullName').lean();
    }

    // Fallback 2: match department only (all academic timetables for the department)
    if (timetables.length === 0) {
      timetables = await Timetable.find({
        departmentId: student.departmentId,
        type: 'academic',
      }).populate('departmentId', 'name fullName').lean();
    }

    sendSuccess(res, { timetables });
  } catch (err) { sendError(res, err.message); }
};

exports.getExamTimetable = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return sendError(res, 'Student not found', 404);

    const timetables = await Timetable.find({
      departmentId: student.departmentId,
      type: 'exam',
      isPublished: true,
    }).populate('departmentId', 'name fullName').lean();

    sendSuccess(res, { timetables });
  } catch (err) { sendError(res, err.message); }
};

exports.getSyllabus = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    if (!student) return sendError(res, 'Student not found', 404);
    const syllabi = await Syllabus.find({ departmentId: student.departmentId }).sort({ createdAt: -1 }).lean();
    sendSuccess(res, { syllabi });
  } catch (err) { sendError(res, err.message); }
};
