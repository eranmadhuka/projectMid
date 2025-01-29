const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app'); // Import the Express app

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

// Export the Express app (DO NOT use app.listen() on Vercel)
module.exports = app;
