// routes/attempt.js
const express = require('express');
const Attempt = require('../models/Attempt');
const Result = require('../models/Result');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const auth = require('../middlewares/auth'); // Authentication middleware
const router = express.Router();

// Submit an attempt
router.post('/submit', auth, async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Authenticated user:', req.user); // Debugging line

        const { quizId, answers, marks } = req.body;
        const studentId = req.user._id; // Ensure this is not null

        if (!studentId) {
            return res.status(400).json({ message: 'User not authenticated.' });
        }

        // Fetch the quiz to ensure it exists
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const { totalMarks, studentMarks, percentageMarks } = marks;

        // Save the attempt
        const attempt = new Attempt({
            student: studentId,
            quiz: quizId,
            answers,
            endTime: Date.now(),
            studentMarks, // Store actual student score
            totalMarks, // Store total possible marks
            percentage: percentageMarks, // Store percentage score
        });
        await attempt.save();

        // Update or create the result
        let result = await Result.findOne({ student: studentId, quiz: quizId });
        if (!result) {
            result = new Result({
                student: studentId,
                quiz: quizId,
                attempts: [],
                bestScore: studentMarks, // Initialize bestScore with studentMarks
                totalMarks, // Store total possible marks
            });
        } else {
            // Update bestScore if the current score is higher
            result.bestScore = Math.max(result.bestScore, studentMarks);
        }
        result.attempts.push(attempt._id);
        await result.save();

        res.status(200).json({ attempt, result });
    } catch (error) {
        console.error('Error in /attempt/submit:', error);
        res.status(500).json({ message: error.message });
    }
});


// Get all attempts for a student
router.get('/attempts', auth, async (req, res) => {
    try {
        const studentId = req.user._id;

        // Populate both `quiz` and `module` fields
        const attempts = await Attempt.find({ student: studentId })
            .populate({
                path: 'quiz',
                populate: {
                    path: 'module',
                    select: 'moduleName moduleCode',
                },
            });

        res.status(200).json(attempts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get results for a specific quiz
router.get('/results/:quizId', auth, async (req, res) => {
    try {
        const studentId = req.user._id;
        const quizId = req.params.quizId;

        const result = await Result.findOne({ student: studentId, quiz: quizId })
            .populate('attempts')
            .populate('quiz');

        if (!result) return res.status(404).json({ message: 'No results found for this quiz.' });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Helper function to compare arrays
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

module.exports = router;