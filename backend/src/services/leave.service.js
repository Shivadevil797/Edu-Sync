const Timetable = require('../models/Timetable');
const LeaveRequest = require('../models/LeaveRequest');
const AdjustedTimetable = require('../models/AdjustedTimetable');
const Faculty = require('../models/Faculty');

// When a leave is approved, mark affected timetable slots as on-leave
// AND generate adjusted timetables with substitute faculty
async function applyLeaveToTimetable(leaveRequest, facultyDoc) {
  if (leaveRequest.status !== 'approved' || !facultyDoc) return;

  const startDate = new Date(leaveRequest.startDate);
  const endDate = new Date(leaveRequest.endDate);

  // Build list of actual dates (not just day names) in the leave range
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const leaveDates = []; // { date: Date, dayName: string }
  const leaveDayNames = new Set();
  const current = new Date(startDate);
  while (current <= endDate) {
    const dayName = dayNames[current.getDay()];
    if (dayName !== 'Sunday') {
      leaveDates.push({ date: new Date(current), dayName });
      leaveDayNames.add(dayName);
    }
    current.setDate(current.getDate() + 1);
  }

  // Find timetables that have this faculty's slots on leave days
  const timetables = await Timetable.find({
    'slots.facultyId': facultyDoc._id,
    'slots.day': { $in: [...leaveDayNames] },
  });

  const affectedSlotIds = [];

  // Mark slots as on-leave in the master timetable
  for (const tt of timetables) {
    let modified = false;
    for (const slot of tt.slots) {
      if (
        slot.facultyId?.toString() === facultyDoc._id.toString() &&
        leaveDayNames.has(slot.day)
      ) {
        slot.isOnLeave = true;
        slot.leaveId = leaveRequest._id;
        affectedSlotIds.push(slot._id);
        modified = true;
      }
    }
    if (modified) await tt.save();
  }

  // Update leave request with affected slot IDs
  leaveRequest.timetableSlotsAffected = affectedSlotIds;
  await leaveRequest.save();

  // ─── Generate Adjusted Timetables ───
  // Remove any previous adjusted timetables for this leave request
  await AdjustedTimetable.deleteMany({ leaveRequestId: leaveRequest._id });

  // Get all department faculty (excluding the absent one and terminated ones)
  const deptFaculty = await Faculty.find({
    departmentId: facultyDoc.departmentId,
    _id: { $ne: facultyDoc._id },
    isTerminated: { $ne: true },
  }).lean();

  // Get ALL timetables for this department to check faculty availability
  const allDeptTimetables = await Timetable.find({
    departmentId: facultyDoc.departmentId,
  }).lean();

  // Build a global occupancy map: "facultyId-dayName-period" → true
  const occupancyMap = {};
  for (const tt of allDeptTimetables) {
    for (const slot of tt.slots) {
      if (slot.facultyId && slot.type !== 'free') {
        const key = `${slot.facultyId.toString()}-${slot.day}-${slot.period}`;
        occupancyMap[key] = true;
      }
    }
  }

  // For each leave date, generate an adjusted timetable per affected timetable
  for (const { date, dayName } of leaveDates) {
    for (const tt of timetables) {
      // Get slots belonging to the absent faculty on this day
      const absentSlots = tt.slots.filter(
        s => s.facultyId?.toString() === facultyDoc._id.toString() && s.day === dayName
      );

      if (absentSlots.length === 0) continue;

      // Track who we've already assigned as substitute this day (avoid double-booking)
      const daySubstitutions = {}; // "facultyId-period" → true

      const adjustedSlots = [];
      for (const slot of absentSlots) {
        // Find a free faculty member for this period on this day
        let substitute = null;
        for (const fac of deptFaculty) {
          const occKey = `${fac._id.toString()}-${dayName}-${slot.period}`;
          const subKey = `${fac._id.toString()}-${slot.period}`;

          // Check if this faculty is free: not in master timetable AND not already assigned as sub today
          if (!occupancyMap[occKey] && !daySubstitutions[subKey]) {
            substitute = fac;
            daySubstitutions[subKey] = true;
            break;
          }
        }

        adjustedSlots.push({
          period: slot.period,
          timeStart: slot.timeStart,
          timeEnd: slot.timeEnd,
          subject: slot.subject,
          originalFacultyId: facultyDoc._id,
          originalFacultyName: facultyDoc.fullName || slot.facultyName,
          substituteFacultyId: substitute?._id || null,
          substituteFacultyName: substitute?.fullName || null,
          room: slot.room,
          type: slot.type,
          status: substitute ? 'substituted' : 'cancelled',
        });
      }

      await AdjustedTimetable.create({
        leaveRequestId: leaveRequest._id,
        originalTimetableId: tt._id,
        absentFacultyId: facultyDoc._id,
        absentFacultyName: facultyDoc.fullName,
        departmentId: facultyDoc.departmentId,
        date,
        dayOfWeek: dayName,
        year: tt.year,
        section: tt.section,
        leaveType: leaveRequest.leaveType,
        leaveReason: leaveRequest.reason,
        adjustedSlots,
      });
    }
  }

  return affectedSlotIds;
}

// Remove leave markings if leave is rejected/cancelled
async function removeLeaveFromTimetable(leaveId) {
  const timetables = await Timetable.find({ 'slots.leaveId': leaveId });
  for (const tt of timetables) {
    let modified = false;
    for (const slot of tt.slots) {
      if (slot.leaveId?.toString() === leaveId.toString()) {
        slot.isOnLeave = false;
        slot.leaveId = null;
        modified = true;
      }
    }
    if (modified) await tt.save();
  }

  // Also remove adjusted timetables
  await AdjustedTimetable.deleteMany({ leaveRequestId: leaveId });
}

module.exports = { applyLeaveToTimetable, removeLeaveFromTimetable };
