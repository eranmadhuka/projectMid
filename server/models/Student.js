const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // One-to-one relationship with User schema
        unique: true,
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
        default: null,
    },
    semester: {
        type: Number,
        min: [1, 'Semester cannot be less than 1'],
        max: [12, 'Semester cannot exceed 12'],
        default: null,
    },
    batch: {
        type: String,
        trim: true,
        default: null,
    },
    examHistory: [
        {
            exam: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exam',
            },
            score: {
                type: Number,
                min: [0, 'Score cannot be less than 0'],
                max: [100, 'Score cannot exceed 100'],
            },
            submittedAt: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: String,
                enum: ['completed', 'pending', 'missed'],
                default: 'completed',
            },
        },
    ],
    enrolledCourses: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
            enrolledAt: {
                type: Date,
                default: Date.now,
            },
            status: {
                type: String,
                enum: ['active', 'completed', 'dropped'],
                default: 'active',
            },
        },
    ],
});

// Add timestamps to keep track of creation and updates
studentSchema.set('timestamps', true);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
