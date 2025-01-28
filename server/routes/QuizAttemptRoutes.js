const express = require('express');
const router = express.Router();
const QuizAttempt = require('../models/QuizAttempt');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

// Middleware to check if the user is authenticated
const authenticate = require('../middleware/authenticate');

/**
 * @route POST /api/quiz-attempts
 * @desc Submit a quiz attempt
 * @access Private
 */
router.post('/', authenticate, async (req, res) => {
    const { userId, quizId, answers, totalTime } = req.body;

    try {
        // Fetch the quiz to validate answers and calculate the score
        const quiz = await Quiz.findById(quizId).populate('questions');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found.' });

        let score = 0;

        // Validate answers and calculate the score
        const processedAnswers = answers.map((answer) => {
            const question = quiz.questions.find((q) => q._id.toString() === answer.questionId);
            if (!question) {
                return { ...answer, isCorrect: false };
            }

            const isCorrect =
                question.type === 'checkbox'
                    ? JSON.stringify(question.correctAnswer.sort()) === JSON.stringify(answer.selectedAnswer.sort())
                    : question.correctAnswer === answer.selectedAnswer;

            if (isCorrect) score++;

            return {
                ...answer,
                isCorrect,
            };
        });

        // Save the quiz attempt
        const quizAttempt = new QuizAttempt({
            userId,
            quizId,
            answers: processedAnswers,
            score,
            totalTime,
            flaggedQuestions: req.body.flaggedQuestions || [],
        });

        await quizAttempt.save();
        res.status(201).json({ message: 'Quiz attempt submitted successfully.', quizAttempt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not submit quiz attempt.' });
    }
});

/**
 * @route GET /api/quiz-attempts/user/:userId
 * @desc Get all quiz attempts by a specific user
 * @access Private
 */
router.get('/user/:userId', authenticate, async (req, res) => {
    try {
        const attempts = await QuizAttempt.find({ userId: req.params.userId }).populate('quizId', 'title');
        res.status(200).json(attempts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not fetch quiz attempts.' });
    }
});

/**
 * @route GET /api/quiz-attempts/quiz/:quizId
 * @desc Get all quiz attempts for a specific quiz
 * @access Private
 */
router.get('/quiz/:quizId', authenticate, async (req, res) => {
    try {
        const attempts = await QuizAttempt.find({ quizId: req.params.quizId }).populate('userId', 'name email');
        res.status(200).json(attempts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not fetch quiz attempts.' });
    }
});

/**
 * @route GET /api/quiz-attempts/:attemptId
 * @desc Get a specific quiz attempt
 * @access Private
 */
router.get('/:attemptId', authenticate, async (req, res) => {
    try {
        const attempt = await QuizAttempt.findById(req.params.attemptId)
            .populate('quizId', 'title')
            .populate('userId', 'name email');

        if (!attempt) {
            return res.status(404).json({ message: 'Quiz attempt not found.' });
        }

        res.status(200).json(attempt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not fetch quiz attempt.' });
    }
});

module.exports = router;
