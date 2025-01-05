const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    department: {
        type: String,
        trim: true,
        default: null,
    },
    designation: {
        type: String,
        trim: true,
        default: null,
    },
    courses: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        assignedAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'planned'],
            default: 'active'
        }
    }],
    exams: [{
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'completed', 'archived'],
            default: 'draft'
        }
    }]
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;