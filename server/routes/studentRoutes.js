const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model
const Student = require('../models/Student'); // Import Student model
const multer = require('multer');

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
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
            .populate('user', 'firstName lastName email phone gender dateOfBirth address city state avatar createdAt lastLogin')
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
            status: student.status?.status || 'N/A',
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

        // Find and update the student
        const updatedStudent = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true } // Return the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
