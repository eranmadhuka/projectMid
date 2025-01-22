const express = require('express');
const cors = require('cors'); // Add CORS if needed
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const path = require('path'); // Import the path module

// Serve uploads folder as a static directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// inport Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const instructorRoutes = require('./routes/InstructorRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const studyMaterialRoutes = require("./routes/studyMaterialRoutes");
const quizRoutes = require("./routes/quizRoutes");

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/students', studentRoutes);
app.use('/api', instructorRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/study-materials", studyMaterialRoutes);
app.use("/api/quizzes", quizRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Fallback route for unmatched endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = app;
