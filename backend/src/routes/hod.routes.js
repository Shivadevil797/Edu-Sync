const router = require('express').Router();
const hod = require('../controllers/hod.controller');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Faculty = require('../models/Faculty');

// Allow both 'hod' and 'faculty' User roles, then verify isHOD flag
router.use(authenticate, authorize('hod', 'faculty'));
router.use(async (req, res, next) => {
  try {
    const faculty = await Faculty.findOne({ userId: req.user._id });
    if (!faculty || (!faculty.isHOD && req.user.role !== 'hod')) {
      return res.status(403).json({ success: false, message: 'HOD access required' });
    }
    next();
  } catch { next(); }
});

router.get('/dashboard', hod.getDashboard);
router.get('/faculty', hod.getFaculty);
router.get('/ex-employees', hod.getExEmployees);
router.get('/timetable', hod.getTimetable);
router.put('/timetable/:id', hod.updateTimetable);
router.post('/syllabus', upload.single('file'), hod.uploadSyllabus);
router.get('/syllabus', hod.getSyllabi);
router.get('/leave-requests', hod.getLeaveRequests);
router.put('/leave-requests/:id', hod.reviewLeaveRequest);
router.post('/leave-request', hod.requestLeave);
router.get('/adjusted-timetable', hod.getAdjustedTimetable);

module.exports = router;
