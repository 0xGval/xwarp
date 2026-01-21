const express = require('express');
const helmet = require('helmet');

// Enhanced security middleware
const securityMiddleware = [
    helmet({
        contentSecurityPolicy: false, // Disable CSP for now
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }),
    express.json({ 
        limit: '10kb',
        strict: true,
        type: 'application/json'
    }),
    // Timeout middleware
    (req, res, next) => {
        const timeoutId = setTimeout(() => {
            if (!res.headersSent) {
                res.status(408).json({ error: 'Request timeout' });
            }
        }, 30000);

        res.on('finish', () => clearTimeout(timeoutId));
        next();
    }
];

module.exports = { securityMiddleware }; 