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

        const { quizId, answers } = req.body;
        const studentId = req.user._id; // Ensure this is not null

        if (!studentId) {
            return res.status(400).json({ message: 'User not authenticated.' });
        }

        // Fetch the quiz and questions
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const questions = await Question.find({ quiz: quizId });

        // Calculate the score
        let score = 0;
        answers.forEach((ans) => {
            const question = questions.find((q) => q._id.equals(ans.question));
            if (!question) return;

            if (question.type === 'checkbox') {
                if (arraysEqual(ans.answer, question.correctAnswers)) {
                    score += question.marks;
                }
            } else {
                if (ans.answer === question.correctAnswer) {
                    score += question.marks;
                }
            }
        });

        console.log("Score" + score);

        // Save the attempt
        const attempt = new Attempt({
            student: studentId,
            quiz: quizId,
            answers,
            endTime: Date.now(),
            score,
        });
        await attempt.save();

        // Update or create the result
        let result = await Result.findOne({ student: studentId, quiz: quizId });
        if (!result) {
            result = new Result({ student: studentId, quiz: quizId, attempts: [] });
        }
        result.attempts.push(attempt._id);
        result.bestScore = Math.max(result.bestScore, score);
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