const ExcelJS = require('exceljs');
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const User = require('../models/User');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const { encrypt, generatePassword, generateUsername } = require('./credential.service');

/**
 * Parse a CSV or Excel file of staff records.
 * Expected columns: S.No, Full Name, Email, Phone, Department, Designation, Qualification, Is HOD
 */
async function parseStaffFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const records = [];

  if (ext === '.csv') {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', row => records.push(normalizeRow(row)))
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
      records.push(normalizeRow(normalized));
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
        row.eachCell((cell, col) => { headers[col] = String(cell.value).trim().toLowerCase(); });
      } else {
        const obj = {};
        row.eachCell((cell, col) => { if (headers[col]) obj[headers[col]] = String(cell.value || '').trim(); });
        records.push(normalizeRow(obj));
      }
    });
    return records;
  }

  throw new Error('Unsupported file format. Use .csv, .xlsx, or .xls');
}

function normalizeRow(row) {
  // Handle various column header names
  return {
    fullName: row['full name'] || row['fullname'] || row['name'] || row['teacher name'] || '',
    email: row['email'] || row['email id'] || '',
    phone: row['phone'] || row['mobile'] || row['contact'] || '',
    department: row['department'] || row['dept'] || '',
    designation: row['designation'] || row['role'] || 'Assistant Professor',
    qualification: row['qualification'] || '',
    isHOD: ['yes', 'true', '1'].includes((row['is hod'] || row['hod'] || '').toLowerCase()),
  };
}

/**
 * Bulk import staff from parsed records.
 * Returns { imported, skipped, errors, credentials }
 */
async function bulkImportStaff(records) {
  const result = { imported: 0, skipped: 0, errors: [], credentials: [] };

  // Get existing usernames to avoid collisions
  const existingUsers = await User.find({}, 'username').lean();
  const existingUsernames = existingUsers.map(u => u.username);

  for (let i = 0; i < records.length; i++) {
    const rec = records[i];
    const rowNum = i + 2; // +2 for header row + 0-index

    try {
      if (!rec.fullName || !rec.email) {
        result.errors.push({ row: rowNum, reason: 'Missing full name or email' });
        result.skipped++;
        continue;
      }

      // Check for duplicate email
      const existingUser = await User.findOne({ email: rec.email.toLowerCase() });
      if (existingUser) {
        result.errors.push({ row: rowNum, reason: `Duplicate email: ${rec.email}` });
        result.skipped++;
        continue;
      }

      // Find or create department
      let dept = await Department.findOne({ name: rec.department.toUpperCase() });
      if (!dept) {
        const isBCA = rec.department.toUpperCase() === 'BCA';
        dept = await Department.create({
          name: rec.department.toUpperCase(),
          fullName: rec.department,
          weeklyHoursRule: isBCA ? 20 : 16,
          labHoursRule: isBCA ? 12 : 0,
          theoryHoursRule: isBCA ? 8 : 16,
        });
      }

      // Generate credentials
      const username = generateUsername(rec.fullName, existingUsernames);
      existingUsernames.push(username);
      const rawPassword = generatePassword();

      // Create user
      const user = await User.create({
        username,
        email: rec.email.toLowerCase(),
        passwordHash: rawPassword, // pre-save hook will bcrypt it
        passwordPlain: encrypt(rawPassword),
        role: rec.isHOD ? 'hod' : 'faculty',
      });

      // Create faculty record
      const faculty = await Faculty.create({
        userId: user._id,
        employeeId: `EMP-${Date.now()}-${String(result.imported + 1).padStart(3, '0')}`,
        fullName: rec.fullName,
        designation: rec.designation,
        qualification: rec.qualification,
        departmentId: dept._id,
        phone: rec.phone,
        isHOD: rec.isHOD,
        weeklyHours: dept.weeklyHoursRule,
        labHours: dept.labHoursRule,
        theoryHours: dept.theoryHoursRule,
      });

      // If HOD, update department
      if (rec.isHOD) {
        dept.hodId = faculty._id;
        await dept.save();
      }

      // Update department faculty count
      dept.totalFaculty = await Faculty.countDocuments({ departmentId: dept._id });
      await dept.save();

      result.credentials.push({ fullName: rec.fullName, username, password: rawPassword, role: user.role });
      result.imported++;
    } catch (err) {
      result.errors.push({ row: rowNum, reason: err.message });
      result.skipped++;
    }
  }

  return result;
}

module.exports = { parseStaffFile, bulkImportStaff };
