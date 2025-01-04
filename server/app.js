const express = require('express');
const cors = require('cors'); // Add CORS if needed
const errorHandler = require('./middlewares/errorHandler');
const app = express();

// inport Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS


// API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Fallback route for unmatched endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

module.exports = app;
