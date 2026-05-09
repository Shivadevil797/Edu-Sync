const router = require('express').Router();
const principal = require('../controllers/principal.controller');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate, authorize('principal'));

router.get('/dashboard', principal.getDashboard);
router.get('/departments', principal.getDepartments);
router.get('/departments/:id', principal.getDepartmentById);
router.get('/faculty', principal.getFaculty);
router.get('/ex-employees', principal.getExEmployees);
router.get('/students', principal.getStudents);
router.get('/leave-requests', principal.getLeaveRequests);
router.put('/leave-requests/:id', principal.reviewLeaveRequest);
router.get('/profile', principal.getProfile);
router.get('/timetable', principal.getTimetable);
router.get('/adjusted-timetable', principal.getAdjustedTimetable);

module.exports = router;
