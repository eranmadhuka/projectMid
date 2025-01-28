// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;