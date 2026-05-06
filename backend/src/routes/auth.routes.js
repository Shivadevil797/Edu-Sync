const router = require('express').Router();
const auth = require('../controllers/auth.controller');
const { authLimiter, studentAuthLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, auth.login);
router.post('/register', studentAuthLimiter, auth.register);
router.post('/register-staff', authLimiter, auth.registerStaff);
router.post('/logout', auth.logout);
router.post('/refresh', auth.refresh);
router.get('/departments', auth.getDepartments);

module.exports = router;
