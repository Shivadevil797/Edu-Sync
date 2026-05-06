const rateLimit = require('express-rate-limit');

// Liberal general limiter — 500 requests / 15 min
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 500,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Liberal auth limiter for staff (admin, principal, HOD, faculty)
// 50 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 900000,
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 50,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for student registration/login
// 10 attempts per 15 minutes
const studentAuthLimiter = rateLimit({
  windowMs: 900000,
  max: 10,
  message: { success: false, message: 'Too many attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter, studentAuthLimiter };
