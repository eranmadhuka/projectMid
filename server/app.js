const express = require('express');
const cors = require('cors'); // Add CORS if needed
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const path = require('path'); // Import the path module

// Serve uploads folder as a static directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
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
app.use("/api/faculties", facultyRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/study-materials", studyMaterialRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quizzes", questionRoutes);
app.use("/api/attempt", attemptRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Fallback route for unmatched endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = app;