const ExcelJS = require('exceljs');
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const Timetable = require('../models/Timetable');
const FacultyWorkload = require('../models/FacultyWorkload');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');

// Period timings (8 periods per day)
const PERIOD_TIMINGS = [
  { period: 1, timeStart: '09:00', timeEnd: '10:00' },
  { period: 2, timeStart: '10:00', timeEnd: '11:00' },
  { period: 3, timeStart: '11:15', timeEnd: '12:15' },
  { period: 4, timeStart: '12:15', timeEnd: '13:15' },
  { period: 5, timeStart: '14:00', timeEnd: '15:00' },
  { period: 6, timeStart: '15:00', timeEnd: '16:00' },
  { period: 7, timeStart: '16:15', timeEnd: '17:15' },
  { period: 8, timeStart: '17:15', timeEnd: '18:15' },
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Parse faculty workload CSV/Excel file
 * Expected columns: Serial No, Teacher Name, Department, Subjects, Year, Section, Weekly Hours
 */
async function parseWorkloadFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const records = [];

  if (ext === '.csv') {
    return new Promise((resolve, reject) => {
      // Read file, strip BOM if present, then parse
      let content = fs.readFileSync(filePath, 'utf-8');
      if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

      const { Readable } = require('stream');
      const stream = Readable.from([content]);
      stream
        .pipe(csvParser())
        .on('data', row => records.push(normalizeWorkloadRow(row)))
        .on('end', () => resolve(records))
        .on('error', reject);
    });
  }

  if (ext === '.xls') {
    // Legacy binary Excel — use SheetJS
    const XLSX = require('xlsx');
    const wb = XLSX.readFile(filePath);
    const sheetName = wb.SheetNames[0];
    if (!sheetName) throw new Error('Excel file has no sheets');
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });
    for (const row of rows) {
      const normalized = {};
      for (const [key, val] of Object.entries(row)) {
        normalized[key.trim().toLowerCase()] = String(val || '').trim();
      }
      records.push(normalizeWorkloadRow(normalized));
    }
    return records;
  }

  if (ext === '.xlsx') {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.worksheets[0];
    if (!sheet) throw new Error('Excel file has no sheets');
    const headers = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell, col) => { headers[col] = String(cell.value).trim().toLowerCase().replace(/^\ufeff/, ''); });
      } else {
        const obj = {};
        row.eachCell((cell, col) => { if (headers[col]) obj[headers[col]] = String(cell.value || '').trim(); });
        records.push(normalizeWorkloadRow(obj));
      }
    });
    return records;
  }

  throw new Error('Unsupported file format');
}

function normalizeWorkloadRow(row) {
  // Normalize all keys to lowercase, trimmed, BOM-stripped
  const normalized = {};
  for (const [key, value] of Object.entries(row)) {
    normalized[key.trim().toLowerCase().replace(/^\ufeff/, '')] = value;
  }

  const subjects = (normalized['subjects'] || normalized['subjects taken'] || normalized['subjects handled'] || '')
    .split(/[,;]/).map(s => s.trim()).filter(Boolean);

  return {
    serialNumber: parseInt(normalized['serial no'] || normalized['s.no'] || normalized['sno'] || normalized['serial number'] || '0'),
    teacherName: normalized['teacher name'] || normalized['name'] || normalized['faculty name'] || '',
    department: (normalized['department'] || normalized['dept'] || '').toUpperCase().trim(),
    subjects,
    yearHandling: parseInt(normalized['year'] || normalized['year handling'] || '1'),
    section: (normalized['section'] || 'A').toUpperCase().trim(),
    weeklyHours: parseInt(normalized['weekly hours'] || normalized['weekly working hours'] || '0'),
  };
}

/**
 * Auto-generate timetables from parsed workload records.
 * Groups records by (department, year, section) → creates one timetable per group.
 *
 * Scheduling strategy:
 * 1. Separate each teacher's subjects into theory and lab lists.
 * 2. Build a pool of "teaching tasks" (subject+teacher+type+hours).
 * 3. Assign theory slots using round-robin across days (max 1 slot per subject per day).
 * 4. Assign lab slots as consecutive 2-hour blocks (max 1 block per day).
 * 5. Two conflict maps prevent collisions:
 *    - classSlots: prevents two subjects in the same class at the same time
 *    - globalFacultySlots: prevents a teacher teaching two classes at the same time
 */
async function generateTimetables(workloadDoc, userId) {
  const records = workloadDoc.records;
  const generatedIds = [];

  // Group records by department + year + section
  const groups = {};
  for (const rec of records) {
    const key = `${rec.department}-${rec.yearHandling}-${rec.section}`;
    if (!groups[key]) groups[key] = { department: rec.department, year: rec.yearHandling, section: rec.section, teachers: [] };
    groups[key].teachers.push(rec);
  }

  // Track faculty assignments GLOBALLY across all groups
  const globalFacultySlots = {}; // key: "name-day-period"

  for (const groupKey of Object.keys(groups)) {
    const group = groups[groupKey];

    // Find or create department
    let dept = await Department.findOne({ name: group.department });
    if (!dept) {
      const isBCA = group.department === 'BCA';
      const isLanguage = ['ENGLISH', 'KANNADA', 'HINDI', 'SANSKRIT'].includes(group.department);
      dept = await Department.create({
        name: group.department,
        fullName: group.department,
        weeklyHoursRule: isBCA ? 20 : isLanguage ? 18 : 16,
        labHoursRule: isBCA ? 12 : 0,
        theoryHoursRule: isBCA ? 8 : isLanguage ? 18 : 16,
      });
    }

    const isBCA = group.department === 'BCA';
    const isLanguage = ['ENGLISH', 'KANNADA', 'HINDI', 'SANSKRIT'].includes(group.department);
    const slots = [];
    const classSlots = {}; // "day-period" → true

    // ─── Phase 1: Build task lists from teacher data ───
    const theoryTasks = []; // { subject, teacherName, facultyId, hours }
    const labTasks = [];    // { subject, teacherName, facultyId, hours }

    for (const teacher of group.teachers) {
      // Escape regex special chars in name
      const escapedName = teacher.teacherName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const notTerminated = { isTerminated: { $ne: true } };

      // Try exact match first, then contains, then match by individual name parts
      let facultyDoc = await Faculty.findOne({
        fullName: { $regex: new RegExp(`^${escapedName}$`, 'i') },
        departmentId: dept._id,
        ...notTerminated,
      });
      if (!facultyDoc) {
        facultyDoc = await Faculty.findOne({
          fullName: { $regex: new RegExp(escapedName, 'i') },
          departmentId: dept._id,
          ...notTerminated,
        });
      }
      if (!facultyDoc) {
        // Try matching by individual name parts (handles "Ravikumar G" vs "G Ravikumar")
        const nameParts = teacher.teacherName.split(/\s+/).filter(p => p.length > 1);
        if (nameParts.length > 0) {
          const partRegex = nameParts.map(p => `(?=.*${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join('');
          facultyDoc = await Faculty.findOne({
            fullName: { $regex: new RegExp(partRegex, 'i') },
            departmentId: dept._id,
            ...notTerminated,
          });
        }
      }
      const facId = facultyDoc?._id || null;

      // Separate theory subjects from lab subjects
      const labSubjects = [];
      const theorySubjects = [];
      for (const s of teacher.subjects) {
        if (s.toLowerCase().includes('lab') || s.toLowerCase().includes('practical')) {
          labSubjects.push(s);
        } else {
          theorySubjects.push(s);
        }
      }

      // Calculate hours based on department type
      let theoryHours, labHours;
      if (isBCA && labSubjects.length > 0) {
        labHours = Math.min(12, teacher.weeklyHours > 8 ? teacher.weeklyHours - 8 : Math.floor(teacher.weeklyHours / 2));
        theoryHours = teacher.weeklyHours - labHours;
      } else if (isBCA && labSubjects.length === 0) {
        // All theory for this teacher
        theoryHours = teacher.weeklyHours;
        labHours = 0;
      } else if (isLanguage) {
        // Language departments: all theory, no lab (18 hrs/week)
        theoryHours = teacher.weeklyHours || dept.weeklyHoursRule || 18;
        labHours = 0;
      } else {
        // Commerce departments (BBA, BCOM) — all theory
        theoryHours = teacher.weeklyHours || dept.weeklyHoursRule;
        labHours = 0;
      }

      // Create theory tasks
      if (theorySubjects.length > 0 && theoryHours > 0) {
        const hrsEach = Math.ceil(theoryHours / theorySubjects.length);
        for (const sub of theorySubjects) {
          theoryTasks.push({
            subject: sub,
            teacherName: teacher.teacherName,
            facultyId: facId,
            hours: Math.min(hrsEach, theoryHours),
          });
          theoryHours -= Math.min(hrsEach, theoryHours);
          if (theoryHours <= 0) break;
        }
      } else if (theoryHours > 0) {
        // No explicit theory subjects → use first subject name
        theoryTasks.push({
          subject: teacher.subjects[0] || 'General',
          teacherName: teacher.teacherName,
          facultyId: facId,
          hours: theoryHours,
        });
      }

      // Create lab tasks (each lab = 2hr blocks)
      if (labHours > 0) {
        const labSubName = labSubjects.length > 0 ? labSubjects[0] : `${theorySubjects[0] || teacher.subjects[0]} Lab`;
        labTasks.push({
          subject: labSubName,
          teacherName: teacher.teacherName,
          facultyId: facId,
          hours: labHours, // Will be assigned in 2-hr blocks
        });
      }
    }

    // ─── Phase 2: Assign theory slots (round-robin across days) ───
    // Strategy: for each task, assign max 1 slot per day, cycling through days
    for (const task of theoryTasks) {
      let assigned = 0;
      let dayStart = 0; // Rotate start day for each task for better spread

      for (let round = 0; round < Math.ceil(task.hours / DAYS.length) + 1 && assigned < task.hours; round++) {
        for (let d = 0; d < DAYS.length && assigned < task.hours; d++) {
          const dayIdx = (d + dayStart) % DAYS.length;
          const day = DAYS[dayIdx];

          // Find first free period on this day
          for (let pIdx = 0; pIdx < PERIOD_TIMINGS.length; pIdx++) {
            const pt = PERIOD_TIMINGS[pIdx];
            const ck = `${day}-${pt.period}`;
            const fk = `${task.teacherName.toLowerCase()}-${day}-${pt.period}`;

            if (classSlots[ck]) continue;
            if (globalFacultySlots[fk]) continue;

            slots.push({
              day,
              period: pt.period,
              timeStart: pt.timeStart,
              timeEnd: pt.timeEnd,
              subject: task.subject,
              facultyId: task.facultyId,
              facultyName: task.teacherName,
              room: `${group.department}-${group.year}${group.section}`,
              type: 'theory',
              isOnLeave: false,
            });

            classSlots[ck] = true;
            globalFacultySlots[fk] = `${group.department}-${group.year}-${group.section}`;
            assigned++;
            break; // Max 1 slot per subject per day per round
          }
        }
      }
      dayStart++; // Next task starts on a different day
    }

    // ─── Phase 3: Assign lab slots (2-hr consecutive blocks) ───
    for (const task of labTasks) {
      let assigned = 0;

      for (let dayIdx = 0; dayIdx < DAYS.length && assigned < task.hours; dayIdx++) {
        const day = DAYS[dayIdx];

        // Find a consecutive pair of free periods
        for (let pIdx = 0; pIdx < PERIOD_TIMINGS.length - 1 && assigned < task.hours; pIdx++) {
          const p1 = PERIOD_TIMINGS[pIdx];
          const p2 = PERIOD_TIMINGS[pIdx + 1];

          // Skip break gaps (period 4→5 has a lunch break)
          if (p1.period === 4 && p2.period === 5) continue;
          // Skip break gaps (period 6→7 has a break)
          if (p1.period === 6 && p2.period === 7) continue;

          const ck1 = `${day}-${p1.period}`;
          const ck2 = `${day}-${p2.period}`;
          const fk1 = `${task.teacherName.toLowerCase()}-${day}-${p1.period}`;
          const fk2 = `${task.teacherName.toLowerCase()}-${day}-${p2.period}`;

          if (classSlots[ck1] || classSlots[ck2]) continue;
          if (globalFacultySlots[fk1] || globalFacultySlots[fk2]) continue;

          // Assign 2-hour lab block
          for (const p of [p1, p2]) {
            const ck = `${day}-${p.period}`;
            const fk = `${task.teacherName.toLowerCase()}-${day}-${p.period}`;

            slots.push({
              day,
              period: p.period,
              timeStart: p.timeStart,
              timeEnd: p.timeEnd,
              subject: task.subject,
              facultyId: task.facultyId,
              facultyName: task.teacherName,
              room: `${group.department}-LAB`,
              type: 'lab',
              isOnLeave: false,
            });

            classSlots[ck] = true;
            globalFacultySlots[fk] = `${group.department}-${group.year}-${group.section}`;
            assigned++;
          }

          break; // Max 1 lab block per day for this task
        }
      }
    }

    // Remove any existing timetable for this combo
    await Timetable.deleteMany({
      departmentId: dept._id,
      year: group.year,
      section: group.section,
      type: 'academic',
    });

    // Create timetable
    const timetable = await Timetable.create({
      departmentId: dept._id,
      department: group.department,
      type: 'academic',
      year: group.year,
      section: group.section,
      slots,
      isPublished: true,
      generatedFrom: workloadDoc._id,
      createdBy: userId,
    });

    generatedIds.push(timetable._id);
  }

  // Update workload doc
  workloadDoc.status = 'processed';
  workloadDoc.generatedTimetableIds = generatedIds;
  await workloadDoc.save();

  return generatedIds;
}

module.exports = { parseWorkloadFile, generateTimetables };
