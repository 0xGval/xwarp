const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests, please try again later',
    waitTime: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: false,
  // Remove IP whitelist in production
  skip: (req) => false
});

// Stricter limit for AI endpoints (more resource-intensive)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute per IP
  message: {
    error: 'AI request limit reached, please try again later',
    waitTime: '1 minute'
  }
});

module.exports = { limiter, aiLimiter }; 