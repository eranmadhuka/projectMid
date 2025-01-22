const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User'); // Import User model
const Student = require('../models/Student'); // Import Student model
const multer = require('multer');

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

/**
 * Route: GET /api/students
 * Description: Fetch all student details, combining data from the User and Student schemas
 */
router.get('/students', async (req, res) => {
    try {
        // Fetch all students and populate the associated User details
        const students = await Student.find({})
            .populate('user', 'firstName lastName email phone gender dateOfBirth address city state avatar createdAt lastLogin status')
            .lean(); // Convert Mongoose documents to plain JavaScript objects for easier manipulation

        // Combine student and user details
        const combinedData = students.map(student => ({
            _id: student._id,
            studentId: student.studentId,
            department: student.department,
            semester: student.semester,
            batch: student.batch,
            firstName: student.user?.firstName || 'N/A',
            lastName: student.user?.lastName || 'N/A',
            email: student.user?.email || 'N/A',
            phone: student.user?.phone || 'N/A',
            gender: student.user?.gender || 'N/A',
            dateOfBirth: student.user?.dateOfBirth || 'N/A',
            address: student.user?.address || 'N/A',
            city: student.user?.city || 'N/A',
            state: student.user?.state || 'N/A',
            avatar: student.user?.avatar || '/uploads/avatars/avatar.png',
            createdAt: student.user?.createdAt || 'N/A',
            lastLogin: student.user?.lastLogin || 'N/A',
            status: student.user?.status || 'N/A',
        }));

        res.status(200).json({
            success: true,
            message: 'Student details retrieved successfully',
            data: combinedData,
        });
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Update Student Endpoint
router.put('/edit-students/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid student ID' });
    }

    const updates = req.body;
    const file = req.file;

    try {
        // If a file is uploaded, update the avatar path
        if (file) {
            updates.avatar = `/uploads/avatars/${file.filename}`;
        }

        // Find the student by ID
        const student = await Student.findById(id).populate('user');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update the associated User document
        const updatedUser = await User.findByIdAndUpdate(
            student.user._id, // Update the associated User document
            { $set: updates },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally, update the Student document if needed
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { $set: { status: updates.status } }, // Example: Update status in Student model
            { new: true }
        );

        res.json({
            message: 'Student updated successfully',
            student: {
                ...updatedStudent.toObject(),
                user: updatedUser, // Include the updated User details
            },
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

/**
 * Route: DELETE /api/students/:id
 * Description: Delete a student by ID
 */
router.delete('/students/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid student ID' });
    }

    try {
        // Find and delete the student
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Optionally, delete the associated User document if needed
        await User.findByIdAndDelete(student.user); // Assuming you want to delete the associated user

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;