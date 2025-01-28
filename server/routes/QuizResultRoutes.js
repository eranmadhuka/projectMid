const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// Save quiz results after a student submits their answers.
router.post('/:quizId/submit', async (req, res) => {
    const { quizId } = req.params;
    const { studentId, answers, flaggedQuestions, score, correctAnswers, incorrectAnswers, totalQuestions } = req.body;

    try {
        const newResult = new QuizResult({
            studentId,
            quizId,
            score,
            correctAnswers,
            incorrectAnswers,
            totalQuestions,
            flaggedQuestions,
            submittedAnswers: answers,
        });

        await newResult.save();

        res.status(201).json({ message: 'Quiz results saved successfully', result: newResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save quiz results', error: error.message });
    }
});

// Retrieve all results for a specific quiz.
router.get('/:quizId/results', async (req, res) => {
    const { quizId } = req.params;

    try {
        const results = await QuizResult.find({ quizId }).populate('studentId', 'name email');
        res.status(200).json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve quiz results', error: error.message });
    }
});

// Retrieve all quiz results for a specific student.
router.get('/students/:studentId/results', async (req, res) => {
    const { studentId } = req.params;

    try {
        const results = await QuizResult.find({ studentId }).populate('quizId', 'title');
        res.status(200).json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve student results', error: error.message });
    }
});

// Retrieve the specific result of a student for a quiz.
router.get('/:quizId/result/:studentId', async (req, res) => {
    const { quizId, studentId } = req.params;

    try {
        const result = await QuizResult.findOne({ quizId, studentId });
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve result', error: error.message });
    }
});

module.exports = router;
