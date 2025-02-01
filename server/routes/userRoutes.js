const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const multer = require('multer');
const bcrypt = require('bcryptjs');

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars'); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename
    },
});

const upload = multer({ storage });

const generateStudentId = () => `STU-${Date.now().toString().slice(-6)}`;
const generateEmployeeId = () => `EMP-${Date.now().toString().slice(-6)}`;

/**
 * Route: GET /api/users
 * Description: Fetch all user details
 */
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({
            success: true,
            message: 'User details retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Get user by ID
router.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "users not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: "Invalid Vehicle ID" });
    }
});

// Update User By ID
router.put('/update/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' }); // Updated message
    }

    const updates = req.body;
    const file = req.file;

    try {
        // If a file is uploaded, update the avatar path
        if (file) {
            updates.avatar = `/uploads/avatars/${file.filename}`;
        }

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Updated message
        }

        // Update the User document
        const updatedUser = await User.findByIdAndUpdate(
            id, // Update the User document directly
            { $set: updates },
            { new: true } // Return the updated document
        );

        res.json({
            message: 'User updated successfully', // Updated message
            user: updatedUser, // Include the updated User details
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

/**
 * Route: DELETE /api/users/:id
 * Description: Delete a user by ID
 */
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' }); // Updated message
    }

    try {
        // Find and delete the user
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Updated message
        }

        res.status(200).json({ message: 'User deleted successfully' }); // Updated message
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

/**
 * Route: POST /api/users
 * Description: Add a new user
 */
router.post('/add', upload.single('avatar'), async (req, res) => {
    const { firstName, lastName, email, password, role, phone, gender, dateOfBirth, address, city, state } = req.body;

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

        // Create User object
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            phone,
            gender,
            dateOfBirth,
            address,
            city,
            state,
            avatar: req.file ? `/uploads/avatars/${req.file.filename}` : undefined, // Set avatar if uploaded
        });

        // Save user
        const savedUser = await newUser.save();

        // Create role-specific profile
        if (role === 'student') {
            const studentId = generateStudentId();
            const student = new Student({ user: savedUser._id, studentId });
            await student.save();
        } else if (role === 'instructor') {
            const employeeId = generateEmployeeId();
            const instructor = new Instructor({ user: savedUser._id, employeeId });
            await instructor.save();
        }

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: savedUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});


module.exports = router;