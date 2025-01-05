const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');

const router = express.Router();

// Generate IDs
const generateStudentId = () => `STU-${Date.now().toString().slice(-6)}`;
const generateEmployeeId = () => `EMP-${Date.now().toString().slice(-6)}`;

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Register Route
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate role
    if (!['student', 'instructor'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role selected.' });
    }

    try {
        // Check if email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const user = new User({ firstName, lastName, email, password: hashedPassword, role });
        await user.save();

        // Create role-specific profile
        if (role === 'student') {
            const studentId = generateStudentId();
            const student = new Student({ user: user._id, studentId });
            await student.save();
        } else if (role === 'instructor') {
            const employeeId = generateEmployeeId();
            const instructor = new Instructor({ user: user._id, employeeId });
            await instructor.save();
        }

        res.status(201).json({
            message: 'User registered successfully. Please log in.',
            success: true,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // If passwords do not match
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Update last login time
        user.lastLogin = new Date();
        await user.save();

        // Fetch additional details based on user role
        let additionalData = {};

        if (user.role === 'student') {
            additionalData = await Student.findOne({ user: user._id });
        } else if (user.role === 'instructor') {
            additionalData = await Instructor.findOne({ user: user._id });
        }

        // Admin does not need extra details, so we leave additionalData as an empty object

        // Respond with success, token, user data, and additional details
        const { password: userPassword, ...userData } = user.toObject(); // Removing password from response

        return res.status(200).json({
            message: 'Login successful',
            token, // Send the token to the client
            user: userData, // Send user data excluding password
            additionalData: additionalData, // Send role-specific data (student or instructor, or empty for admin)
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});


module.exports = router;
