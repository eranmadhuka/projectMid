const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    // Basic Information
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student',
    },

    // Profile Information
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return !v || validator.isMobilePhone(v);
            },
            message: 'Please provide a valid phone number',
        },
        default: null,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other',
    },
    dateOfBirth: {
        type: Date,
        validate: {
            validator: function (v) {
                return !v || v < new Date();
            },
            message: 'Date of birth cannot be in the future',
        },
        default: null,
    },

    // Location Information
    address: {
        type: String,
        trim: true,
        maxlength: [200, 'Address cannot exceed 200 characters'],
        default: null,
    },
    city: {
        type: String,
        trim: true,
        maxlength: [50, 'City cannot exceed 50 characters'],
        default: null,
    },
    state: {
        type: String,
        trim: true,
        maxlength: [50, 'State cannot exceed 50 characters'],
        default: null,
    },

    // Profile Picture
    avatar: {
        type: String,
        default: '/uploads/avatars/avatar.png',
    },

    // System Fields
    status: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true, // Cannot be modified after creation
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update `updatedAt` field automatically on updates
userSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = new Date();
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
