const mongoose = require('mongoose');

const adjustedSlotSchema = new mongoose.Schema({
  period: { type: Number, required: true, min: 1, max: 8 },
  timeStart: String,
  timeEnd: String,
  subject: String,
  originalFacultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  originalFacultyName: String,
  substituteFacultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  substituteFacultyName: String,
  room: String,
  type: { type: String, enum: ['theory', 'lab', 'free'], default: 'theory' },
  status: { type: String, enum: ['substituted', 'cancelled'], default: 'substituted' },
}, { _id: true });

const adjustedTimetableSchema = new mongoose.Schema({
  leaveRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveRequest', required: true },
  originalTimetableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable' },
  absentFacultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  absentFacultyName: { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  date: { type: Date, required: true },
  dayOfWeek: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
  year: Number,
  section: { type: String, default: 'A' },
  leaveType: String,
  leaveReason: String,
  adjustedSlots: [adjustedSlotSchema],
}, { timestamps: true });

adjustedTimetableSchema.index({ departmentId: 1, date: 1 });
adjustedTimetableSchema.index({ absentFacultyId: 1, date: 1 });
adjustedTimetableSchema.index({ 'adjustedSlots.substituteFacultyId': 1, date: 1 });

module.exports = mongoose.model('AdjustedTimetable', adjustedTimetableSchema);
