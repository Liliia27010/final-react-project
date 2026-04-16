-- Create the submissions table for storing form submissions
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullName TEXT NOT NULL,
  email TEXT NOT NULL,
  dateOfBirth TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create an index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_email ON submissions(email);
