import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite database
const dbPath = path.join(__dirname, '..', 'db', 'submissions.db');
const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Read and execute the schema
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error initializing database:', err);
    } else {
      console.log('Database schema initialized successfully');
    }
  });
}

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
  const sql = `INSERT INTO submissions (fullName, email, dateOfBirth) VALUES (?, ?, ?)`;
  
  db.run(sql, [fullName, email, dateOfBirth], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error saving form data',
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      id: this.lastID,
      data: {
        id: this.lastID,
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
  
  db.all(sql, [], (err, rows) => {
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
      count: rows.length,
      data: rows
    });
  });
});

// Get single submission by ID
app.get('/api/submissions/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM submissions WHERE id = ?`;
  
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching submission',
        error: err.message
      });
    }

    if (!row) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: row
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
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

export default app;
