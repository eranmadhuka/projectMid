const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Instructor = require('../models/Instructor');
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

router.get('/instructors', async (req, res) => {
    try {
        // Fetch all students and populate the associated User details
        const instructors = await Instructor.find({})
            .populate('user', 'firstName lastName email phone gender dateOfBirth address city state avatar createdAt lastLogin status')
            .lean(); // Convert Mongoose documents to plain JavaScript objects for easier manipulation

        const combinedData = instructors.map(instructor => ({
            _id: instructor._id,
            employeeId: instructor.employeeId,
            // department: instructor.department,
            // semester: instructor.semester,
            // batch: instructor.batch,
            firstName: instructor.user?.firstName || 'N/A',
            lastName: instructor.user?.lastName || 'N/A',
            email: instructor.user?.email || 'N/A',
            phone: instructor.user?.phone || 'N/A',
            gender: instructor.user?.gender || 'N/A',
            dateOfBirth: instructor.user?.dateOfBirth || 'N/A',
            address: instructor.user?.address || 'N/A',
            city: instructor.user?.city || 'N/A',
            state: instructor.user?.state || 'N/A',
            avatar: instructor.user?.avatar || '/uploads/avatars/avatar.png',
            createdAt: instructor.user?.createdAt || 'N/A',
            lastLogin: instructor.user?.lastLogin || 'N/A',
            status: instructor.user?.status || 'N/A',
        }));

        res.status(200).json({
            success: true,
            message: 'Instructor details retrieved successfully',
            data: combinedData,
        });
    } catch (error) {
        console.error('Error fetching instructor details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
});

// Update instructor Endpoint
router.put('/edit-emp/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid instructor ID' });
    }

    const updates = req.body;
    const file = req.file;

    try {
        // If a file is uploaded, update the avatar path
        if (file) {
            updates.avatar = `/uploads/avatars/${file.filename}`;
        }

        // Find the instructor by ID
        const instructor = await Instructor.findById(id).populate('user');
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        // Update the associated User document
        const updatedUser = await User.findByIdAndUpdate(
            instructor.user._id, // Update the associated User document
            { $set: updates },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally, update the instructor document if needed
        const updatedStudent = await Instructor.findByIdAndUpdate(
            id,
            { $set: { status: updates.status } }, // Example: Update status in instructor model
            { new: true }
        );

        res.json({
            message: 'Instructor updated successfully',
            instructor: {
                ...updatedStudent.toObject(),
                user: updatedUser, // Include the updated User details
            },
        });
    } catch (error) {
        console.error('Error updating instructor:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

/**
 * Route: DELETE /api/students/:id
 * Description: Delete a instructor by ID
 */
router.delete('/emp/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid instructor ID' });
    }

    try {
        // Find and delete the instructor
        const instructor = await Instructor.findByIdAndDelete(id);
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        // Optionally, delete the associated User document if needed
        await User.findByIdAndDelete(instructor.user); // Assuming you want to delete the associated user

        res.status(200).json({ message: 'instructor deleted successfully' });
    } catch (error) {
        console.error('Error deleting instructor:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;