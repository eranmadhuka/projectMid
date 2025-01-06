const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
// const authenticate = require('../middlewares/authMiddleware');
const authenticateToken = require('../middlewares/authenticateToken');

const User = require('../models/User');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images (jpeg, jpg, png) are allowed.'));
        }
    }
});

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


// Update Profile Route
router.put('/update', authenticateToken, upload.single('avatar'), async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone, gender, dateOfBirth, address, city, state } = req.body;

        // Debug incoming data
        console.log('Incoming body:', req.body);
        console.log('Incoming file:', req.file);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phone = phone || user.phone;
        user.gender = gender || user.gender;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.address = address || user.address;
        user.city = city || user.city;
        user.state = state || user.state;

        if (req.file) {
            user.avatar = `/uploads/avatars/${req.file.filename}`;
        }

        // Save updated user
        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Change Password Route
router.put('/change-password', authenticateToken, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password is correct
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        // Hash the new password and update it
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
