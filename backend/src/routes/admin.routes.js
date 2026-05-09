const router = require('express').Router();
const admin = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(authenticate, authorize('admin'));

router.get('/dashboard', admin.getDashboard);
router.get('/profile', admin.getProfile);

// Staff management
router.get('/staff', admin.getStaff);
router.post('/staff', admin.createStaff);
router.post('/staff/bulk-import', upload.single('file'), admin.bulkImportStaff);
router.get('/staff/ex-employees', admin.getExEmployees);
router.put('/staff/:id', admin.updateStaff);
router.delete('/staff/:id', admin.deleteStaff);

// Student management
router.get('/students', admin.getStudents);
router.post('/students', admin.createStudent);
router.put('/students/:id', admin.updateStudent);
router.delete('/students/:id', admin.deleteStudent);

// Timetable management
router.post('/timetable/upload-workload', upload.single('file'), admin.uploadWorkload);
router.get('/timetable/workloads', admin.getWorkloads);
router.get('/timetable', admin.getTimetables);
router.put('/timetable/:id', admin.updateTimetable);
router.post('/timetable/:id/publish', admin.publishTimetable);
router.delete('/timetable/:id', admin.deleteTimetable);

module.exports = router;
