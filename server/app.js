const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploads folder as a static directory
app.use('/uploads', express.static(uploadsDir));

// Middleware
app.use(express.json()); // Parse JSON bodies

// Allowed origins
// const allowedOrigins = ["https://project-mid-4sit.vercel.app"];
const allowedOrigins = ["http://localhost:3000"];

// Custom CORS handling
app.use(cors());

// Handle preflight requests
// app.options("*", cors());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Origin:', req.headers.origin);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const instructorRoutes = require('./routes/InstructorRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes = require("./routes/AttemptRoutes");

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api', instructorRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/study-materials', studyMaterialRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/quizzes', questionRoutes);
app.use('/api/attempt', attemptRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Fallback route for unmatched endpoints
app.use((req, res) => {
    res.status(404).json({
        message: 'API endpoint not found',
        path: req.url,
        method: req.method
    });
});

module.exports = app;
