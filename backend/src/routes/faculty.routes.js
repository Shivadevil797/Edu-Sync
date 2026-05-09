const router = require('express').Router();
const faculty = require('../controllers/faculty.controller');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate, authorize('faculty'));

router.get('/dashboard', faculty.getDashboard);
router.get('/timetable', faculty.getTimetable);
router.post('/leave-request', faculty.requestLeave);
router.get('/leave-requests', faculty.getLeaveRequests);
router.get('/syllabus', faculty.getSyllabi);
router.get('/adjusted-timetable', faculty.getAdjustedTimetable);

module.exports = router;
