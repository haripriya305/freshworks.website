
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'freshworks-dev-secret-change-me';
  console.warn('⚠️ JWT_SECRET not set — using a default. Set JWT_SECRET in your environment for production.');
}

const app = express();

app.use(cors());
app.use(express.json());

// Make sure tables/demo data exist before any /api request is handled
app.use('/api', async (req, res, next) => {
  try {
    await db.ready();
    next();
  } catch (err) {
    console.error('DB init failed:', err.message);
    res.status(500).json({
      message: 'Database connection failed: ' + err.message
    });
  }
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'freshworks-api',
    database: db.isMemory ? 'memory' : 'mysql'
  });
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/admin', require('./routes/admin'));

// Unknown API route
app.use('/api', (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Serve frontend locally and on Vercel
const frontendDir = process.env.VERCEL
  ? path.join(__dirname, '../public')
  : path.join(__dirname, '../frontend');

app.use(express.static(frontendDir));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendDir, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({
    message: 'Internal server error'
  });
});

module.exports = app;
