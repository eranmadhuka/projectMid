const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();

// Add a question to a quiz
router.post("/:quizId/questions", async (req, res) => {
    try {
        const { text, type, options, correctAnswer } = req.body;

        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const newQuestion = { text, type, options, correctAnswer };
        quiz.questions.push(newQuestion);

        await quiz.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Failed to add question", error: error.message });
    }
});

// Update a question in a quiz
router.put("/:quizId/questions/:questionId", async (req, res) => {
    try {
        const { text, type, options, correctAnswer } = req.body;

        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const question = quiz.questions.id(req.params.questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        question.text = text;
        question.type = type;
        question.options = options;
        question.correctAnswer = correctAnswer;

        await quiz.save();
        res.status(200).json(question);
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ message: "Failed to update question", error: error.message });
    }
});

// Delete a question from a quiz
router.delete("/:quizId/questions/:questionId", async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const question = quiz.questions.id(req.params.questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        question.remove(); // Remove the question
        await quiz.save();

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: "Failed to delete question", error: error.message });
    }
});

module.exports = router;