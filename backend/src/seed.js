/**
 * Seed script: creates initial admin, principal users and departments.
 * Run: node src/seed.js          → creates defaults if missing
 * Run: node src/seed.js --clean  → removes all test data, keeps admin/principal, re-seeds departments
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Student = require('./models/Student');
const Faculty = require('./models/Faculty');
const Department = require('./models/Department');
const Timetable = require('./models/Timetable');
const FacultyWorkload = require('./models/FacultyWorkload');
const LeaveRequest = require('./models/LeaveRequest');
const Syllabus = require('./models/Syllabus');
const { encrypt } = require('./services/credential.service');

const isClean = process.argv.includes('--clean');

const departments = [
  { name: 'BCA', fullName: 'Bachelor of Computer Applications', weeklyHoursRule: 20, labHoursRule: 12, theoryHoursRule: 8 },
  { name: 'BBA', fullName: 'Bachelor of Business Administration', weeklyHoursRule: 16, labHoursRule: 0, theoryHoursRule: 16 },
  { name: 'BCOM', fullName: 'Bachelor of Commerce', weeklyHoursRule: 16, labHoursRule: 0, theoryHoursRule: 16 },
  // Language departments — 18 hours/week (all theory)
  { name: 'ENGLISH', fullName: 'English Department', weeklyHoursRule: 18, labHoursRule: 0, theoryHoursRule: 18 },
  { name: 'KANNADA', fullName: 'Kannada Department', weeklyHoursRule: 18, labHoursRule: 0, theoryHoursRule: 18 },
  { name: 'HINDI', fullName: 'Hindi Department', weeklyHoursRule: 18, labHoursRule: 0, theoryHoursRule: 18 },
  { name: 'SANSKRIT', fullName: 'Sanskrit Department', weeklyHoursRule: 18, labHoursRule: 0, theoryHoursRule: 18 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // ── CLEAN MODE ──
    if (isClean) {
      console.log('\n🧹 Clean mode: removing all test data...');

      // Remove all non-admin/principal users and their associated records
      const protectedUsers = await User.find({ role: { $in: ['admin', 'principal'] } }, '_id');
      const protectedIds = protectedUsers.map(u => u._id);

      const removedUsers = await User.deleteMany({ _id: { $nin: protectedIds } });
      const removedStudents = await Student.deleteMany({});
      const removedFaculty = await Faculty.deleteMany({});
      const removedTimetables = await Timetable.deleteMany({});
      const removedWorkloads = await FacultyWorkload.deleteMany({});
      const removedLeaves = await LeaveRequest.deleteMany({});
      const removedSyllabi = await Syllabus.deleteMany({});

      console.log(`  ✅ Removed ${removedUsers.deletedCount} user(s) (kept admin + principal)`);
      console.log(`  ✅ Removed ${removedStudents.deletedCount} student(s)`);
      console.log(`  ✅ Removed ${removedFaculty.deletedCount} faculty record(s)`);
      console.log(`  ✅ Removed ${removedTimetables.deletedCount} timetable(s)`);
      console.log(`  ✅ Removed ${removedWorkloads.deletedCount} workload(s)`);
      console.log(`  ✅ Removed ${removedLeaves.deletedCount} leave request(s)`);
      console.log(`  ✅ Removed ${removedSyllabi.deletedCount} syllabus record(s)`);

      // Reset department counts and HOD refs
      await Department.updateMany({}, { $set: { totalStudents: 0, totalFaculty: 0, hodId: null } });
      console.log('  ✅ Reset department counts');
      console.log('');
    }

    // ── CREATE ADMIN ──
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (!existingAdmin) {
      await User.create({
        username: 'admin',
        email: 'admin@edusync.com',
        passwordHash: 'Admin@123',
        passwordPlain: encrypt('Admin@123'),
        role: 'admin',
      });
      console.log('✅ Admin user created (username: admin, password: Admin@123)');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // ── CREATE PRINCIPAL ──
    const existingPrincipal = await User.findOne({ role: 'principal' });
    if (!existingPrincipal) {
      await User.create({
        username: 'principal',
        email: 'principal@edusync.com',
        passwordHash: 'Principal@123',
        passwordPlain: encrypt('Principal@123'),
        role: 'principal',
      });
      console.log('✅ Principal user created (username: principal, password: Principal@123)');
    } else {
      console.log('ℹ️  Principal user already exists');
    }

    // ── CREATE DEPARTMENTS ──
    for (const dept of departments) {
      const exists = await Department.findOne({ name: dept.name });
      if (!exists) {
        await Department.create(dept);
        console.log(`✅ Department created: ${dept.name} (${dept.fullName}) — ${dept.weeklyHoursRule} hrs/week`);
      } else {
        // Update hours rules in case they changed
        exists.weeklyHoursRule = dept.weeklyHoursRule;
        exists.labHoursRule = dept.labHoursRule;
        exists.theoryHoursRule = dept.theoryHoursRule;
        exists.fullName = dept.fullName;
        await exists.save();
        console.log(`ℹ️  Department ${dept.name} already exists (updated rules)`);
      }
    }

    console.log('\n🎉 Seed complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
