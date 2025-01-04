const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phone: {
        type: String,
        required: false,
        default: null,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false,
        default: 'other',
    },
    dateOfBirth: {
        type: Date,
        required: false,
        default: null,
    },
    address: {
        type: String,
        required: false,
        default: null,
    },
    city: {
        type: String,
        required: false,
        default: null,
    },
    state: {
        type: String,
        required: false,
        default: null,
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',
    },
    avatar: {
        type: String,
        default: 'https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    examsFaced: [
        {
            examId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exam',
            },
            score: Number,
            completedAt: Date,
        },
    ],
    coursesTaught: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    ],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
