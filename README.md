# Final Project - Full Stack Application

A complete full stack web application for submitting and displaying form data, integrating React frontend, Node.js/Express backend, and SQLite database.

## 🏗️ Project Structure

```
final-project/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Styles
│   ├── originalPage/      # Original source page (from Task I)
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/               # Node.js Express API server
│   ├── server.js          # Main server file
│   └── package.json
├── db/                    # Database configuration
│   ├── schema.sql         # Database schema
│   └── index.js           # Database initialization
└── README.md              # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend API will start on `http://localhost:5000`

### 3. Start the Frontend Application

In a new terminal window:
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173` (or another available port)

## 📋 API Endpoints

### POST /api/submit-form
Submit a new form with user information
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "dateOfBirth": "1990-01-15"
}
```

### GET /api/submissions
Retrieve all submitted forms from the database

### GET /api/submissions/:id
Retrieve a specific submission by ID

### GET /api/health
Health check endpoint

## 🎯 Features

### Main Page (Task I)
- Hero section with professional introduction
- Skills section displaying technical skills
- Clean, modern dark theme design

### Form Page (Task J)
- Contact form with validation
- Fields: Full Name, Email, Date of Birth
- Form data submission to backend API
- Success/error feedback display
- Real-time validation

### Submissions Display Page (Bonus)
- View all submitted forms stored in the database
- Card view with formatted data
- Refresh functionality
- Statistics (total submission count)

## 🗄️ Database

The application uses SQLite for data persistence. The database schema includes:

**submissions table:**
- `id` - Primary key
- `fullName` - User's full name
- `email` - User's email address
- `dateOfBirth` - User's date of birth
- `createdAt` - Timestamp of submission

## 🔧 Technologies Used

### Frontend
- React 18+
- React Router DOM for navigation
- Zod for form validation
- Vite for build tool

### Backend
- Node.js
- Express.js for REST API
- SQLite3 for database
- CORS for cross-origin requests

## ✨ Key Integrations

1. **Form Validation** - Client-side validation using Zod schema
2. **API Communication** - Fetch API for frontend to backend communication
3. **Database Persistence** - Form data stored in SQLite database
4. **Error Handling** - Comprehensive error handling throughout the stack
5. **Responsive Design** - Mobile-friendly interface

## 📚 File Descriptions

### Frontend Files
- `App.jsx` - Main application component with routing
- `Navbar.jsx` - Navigation component with links to all pages
- `Hero.jsx` - Hero section component
- `Skills.jsx` - Skills display component
- `FormPage.jsx` - Form submission page
- `FormResponse.jsx` - Form submission response display
- `SubmissionsPage.jsx` - Display all stored submissions

### Backend Files
- `server.js` - Express.js server with API endpoints
- `package.json` - Dependencies and scripts

### Database Files
- `schema.sql` - SQL table definitions

## 💾 Data Flow

1. User enters data in the form (FormPage)
2. React validates data using Zod schema
3. Valid data sent to backend API via POST request
4. Backend validates data again
5. Data inserted into SQLite database
6. Success response returned to frontend
7. FormResponse component displays the result
8. User can view all submissions in SubmissionsPage

## 🎨 Styling

The application uses a consistent dark theme:
- Dark background: `#0a0a0a`
- Cards background: `#111`
- Primary color (links): `#007bff` (blue)
- Success color: `#28a745` (green)
- Error color: `#dc3545` (red)
- Text color: `#fff` (white)

## 📝 Notes

- The `originalPage` folder contains the original HTML source from Task I
- The application uses ES modules for the backend
- CORS is configured to accept requests from localhost

## ✅ Checklist

- [x] Full stack structure created (db, backend, frontend)
- [x] Backend API server with Node.js/Express
- [x] SQLite database with proper schema
- [x] React form integration
- [x] Form data submission to backend
- [x] Database persistence
- [x] Submissions display page (bonus)
- [x] Navigation routing

## 👤 Author

Liliia - 2026
