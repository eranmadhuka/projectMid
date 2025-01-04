const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Register
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone, gender, dateOfBirth, address, city, state } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            phone,
            gender,
            dateOfBirth,
            address,
            city,
            state,
            avatar,
            role: 'student', // Default role
        });

        res.status(201).json({ token: generateToken(user._id) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    gender: user.gender,
                    dateOfBirth: user.dateOfBirth,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    avatar: user.avatar,
                    role: user.role,
                },
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update user profile
router.put('/update', protect, async (req, res) => {
    console.log('req.user:', req.user); // Debug log

    if (!req.user) {
        return res.status(400).json({ message: 'User not authenticated' });
    }
    const { firstName, lastName, phone, gender, dateOfBirth, address, city, state, avatar } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.phone = phone || user.phone;
            user.gender = gender || user.gender;
            user.dateOfBirth = dateOfBirth || user.dateOfBirth;
            user.address = address || user.address;
            user.city = city || user.city;
            user.state = state || user.state;
            user.avatar = avatar || user.avatar;

            const updatedUser = await user.save();

            res.json({
                message: 'Profile updated successfully',
                user: {
                    _id: updatedUser._id,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    gender: updatedUser.gender,
                    dateOfBirth: updatedUser.dateOfBirth,
                    address: updatedUser.address,
                    city: updatedUser.city,
                    state: updatedUser.state,
                    avatar: updatedUser.avatar,
                },
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Upload Avatar
router.post('/upload-avatar', protect, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.avatar = `/uploads/${req.file.filename}`; // Save the file path in the database
            await user.save();

            res.status(200).json({
                message: 'Avatar uploaded successfully',
                avatar: user.avatar,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
