import express from 'express';
import cors from 'cors';
import client from '../db/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
});

// Submit form data endpoint
app.post('/api/submit-form', (req, res) => {
  const { fullName, email, dateOfBirth } = req.body;

  // Validation
  if (!fullName || !email || !dateOfBirth) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: fullName, email, dateOfBirth'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Insert into database
  const sql = `INSERT INTO submissions (fullName, email, dateOfBirth) VALUES ($1, $2, $3) RETURNING id`;
  
  client.query(sql, [fullName, email, dateOfBirth], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error saving form data',
        error: err.message
      });
    }

    const id = result.rows[0].id;
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      id: id,
      data: {
        id: id,
        fullName,
        email,
        dateOfBirth,
        createdAt: new Date().toISOString()
      }
    });
  });
});

// Get all submissions endpoint (for bonus feature)
app.get('/api/submissions', (req, res) => {
  const sql = `SELECT * FROM submissions ORDER BY createdAt DESC`;
  
  client.query(sql, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching submissions',
        error: err.message
      });
    }

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  });
});

// Get single submission by ID
app.get('/api/submissions/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM submissions WHERE id = $1`;
  
  client.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching submission',
        error: err.message
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET  /api/health`);
  console.log(`  POST /api/submit-form`);
  console.log(`  GET  /api/submissions`);
  console.log(`  GET  /api/submissions/:id`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  client.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

export default app;
