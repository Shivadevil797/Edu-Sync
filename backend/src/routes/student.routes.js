const router = require('express').Router();
const student = require('../controllers/student.controller');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate, authorize('student'));

router.get('/profile', student.getProfile);
router.put('/profile', student.updateProfile);
router.get('/timetable/academic', student.getAcademicTimetable);
router.get('/timetable/exam', student.getExamTimetable);
router.get('/syllabus', student.getSyllabus);
router.get('/timetable/adjusted', student.getAdjustedTimetable);

module.exports = router;
