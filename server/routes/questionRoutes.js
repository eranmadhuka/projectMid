const express = require("express");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const router = express.Router();

// Add a question to a quiz
router.post("/:quizId/questions", async (req, res) => {
    try {
        const { text, type, options, correctAnswer, correctAnswers, marks } = req.body;
        const quizId = req.params.quizId;

        // Validate the question type and correct answer(s)
        // if (type === "true-false" && !["true", "false"].includes(correctAnswer)) {
        //     return res.status(400).json({ message: "Invalid correctAnswer for true-false question" });
        // }

        if (type === "multiple-choice") {
            // Convert correctAnswer to a number and add 1
            const correctAnswerIndex = Number(correctAnswer);
            if (isNaN(correctAnswerIndex) || correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
                return res.status(400).json({ message: "Invalid correctAnswer for multiple-choice question" });
            }
            // Add 1 to the correctAnswer index before saving
            req.body.correctAnswer = correctAnswerIndex + 1;
        }

        if (type === "checkbox" && (!Array.isArray(correctAnswers) || correctAnswers.some(index => index < 0 || index >= options.length))) {
            return res.status(400).json({ message: "Invalid correctAnswers for checkbox question" });
        }

        // Create the question
        const newQuestion = new Question({
            text,
            type,
            options,
            correctAnswer: type === "checkbox" ? undefined : req.body.correctAnswer, // Use updated correctAnswer for multiple-choice
            correctAnswers: type === "checkbox" ? correctAnswers : undefined, // Only include for checkbox
            marks,
            quiz: quizId,
        });

        // Save the question
        await newQuestion.save();

        // Update the quiz's questions array
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        quiz.questions.push(newQuestion._id); // Add the new question's ID to the quiz's questions array
        await quiz.save();

        res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Failed to add question", error: error.message });
    }
});

// Fetch all questions for a quiz
router.get("/:quizId/questions", async (req, res) => {
    try {
        // Find the quiz and populate its questions
        const quiz = await Quiz.findById(req.params.quizId).populate("questions");
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json(quiz.questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Failed to fetch questions", error: error.message });
    }
});

// Fetch a single question by ID
router.get("/:quizId/questions/:questionId", async (req, res) => {
    try {
        // Find the question
        const question = await Question.findById(req.params.questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the question belongs to the specified quiz
        if (question.quiz.toString() !== req.params.quizId) {
            return res.status(400).json({ message: "Question does not belong to this quiz" });
        }

        res.status(200).json(question);
    } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ message: "Failed to fetch question", error: error.message });
    }
});

// Update a question in a quiz
router.put("/:quizId/questions/:questionId", async (req, res) => {
    try {
        const { text, type, options, correctAnswer, correctAnswers, marks } = req.body;
        const { quizId, questionId } = req.params;

        // Find the question
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the question belongs to the specified quiz
        if (question.quiz.toString() !== quizId) {
            return res.status(400).json({ message: "Question does not belong to this quiz" });
        }

        // Validate the question type and correct answer(s)
        if (type === "true-false" && !["true", "false"].includes(correctAnswer)) {
            return res.status(400).json({ message: "Invalid correctAnswer for true-false question" });
        }

        if (type === "multiple-choice") {
            // Convert correctAnswer to a number and add 1
            const correctAnswerIndex = Number(correctAnswer);
            if (isNaN(correctAnswerIndex) || correctAnswerIndex < 0 || correctAnswerIndex >= options.length) {
                return res.status(400).json({ message: "Invalid correctAnswer for multiple-choice question" });
            }
            // Add 1 to the correctAnswer index before saving
            req.body.correctAnswer = correctAnswerIndex + 1;
        }

        if (type === "checkbox" && (!Array.isArray(correctAnswers) || correctAnswers.some(index => index < 0 || index >= options.length))) {
            return res.status(400).json({ message: "Invalid correctAnswers for checkbox question" });
        }

        // Update the question fields
        question.text = text;
        question.type = type;
        question.options = options;
        question.marks = marks;

        // Update correctAnswer or correctAnswers based on the question type
        if (type === "checkbox") {
            question.correctAnswers = correctAnswers;
            question.correctAnswer = undefined; // Clear correctAnswer for checkbox questions
        } else {
            question.correctAnswer = req.body.correctAnswer; // Use updated correctAnswer for multiple-choice
            question.correctAnswers = undefined; // Clear correctAnswers for non-checkbox questions
        }

        // Save the updated question
        await question.save();

        res.status(200).json(question);
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ message: "Failed to update question", error: error.message });
    }
});

// Get total marks from questions
router.get('/:quizId/total-marks', async (req, res) => {
    try {
        const { quizId } = req.params;

        // Ensure quizId is a valid ObjectId
        if (!quizId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid quiz ID" });
        }

        // Fetch all questions for the quiz
        const questions = await Question.find({ quiz: quizId });

        // Calculate total possible marks
        const totalMarks = questions.reduce((sum, question) => sum + question.marks, 0);

        res.status(200).json({ totalMarks });
    } catch (error) {
        console.error('Error fetching total marks:', error);
        res.status(500).json({ message: error.message });
    }
});


// Delete a question from a quiz
router.delete("/:quizId/questions/:questionId", async (req, res) => {
    try {
        // Find the question
        const question = await Question.findById(req.params.questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the question belongs to the specified quiz
        if (question.quiz.toString() !== req.params.quizId) {
            return res.status(400).json({ message: "Question does not belong to this quiz" });
        }

        // Remove the question from the quiz's questions array
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        quiz.questions = quiz.questions.filter(
            (q) => q.toString() !== req.params.questionId
        );
        await quiz.save();

        // Delete the question using deleteOne or findByIdAndDelete
        await Question.deleteOne({ _id: req.params.questionId }); // Use deleteOne
        // Alternatively, you can use:
        // await Question.findByIdAndDelete(req.params.questionId);

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: "Failed to delete question", error: error.message });
    }
});

module.exports = router;