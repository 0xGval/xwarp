require('dotenv').config(); // This must be the first line!
const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./middleware/cors');
const { limiter } = require('./middleware/rateLimiter');
const { securityMiddleware } = require('./middleware/security');
const twitterRoutes = require('./twitter');

// Environment validation
const requiredEnvVars = ['OPENAI_API_KEY', 'RAPIDAPI_KEY'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`ERROR: ${varName} is not set`);
        process.exit(1);
    }
});

const app = express();

// Trust proxy - must be first!
app.set('trust proxy', 1);

// Middleware
app.use(cors(corsOptions));
app.use(limiter);
app.use(securityMiddleware);
app.disable('x-powered-by');

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'XWarp API is running' });
});

// Routes
app.use('/api', twitterRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});