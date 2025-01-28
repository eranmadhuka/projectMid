const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();

// Create a new quiz
router.post("/", async (req, res) => {
    try {
        // const { title, description, faculty, year, module, duration, questions } = req.body;
        const { title, description, faculty, module, duration, questions } = req.body;

        const newQuiz = new Quiz({
            title,
            description,
            faculty,
            // year,
            module,
            duration,
            questions,
        });

        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ message: "Failed to create quiz", error: error.message });
    }
});

// Get all quizzes
router.get("/", async (req, res) => {
    try {
        const quizzes = await Quiz.find()
            .populate("module") // Populate module details
            .populate("faculty", "name") // Populate module details
        res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        res.status(500).json({ message: "Failed to fetch quizzes", error: error.message });
    }
});

// Get a single quiz by ID
router.get("/:id", async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate("module") // Populate module details
            .populate("faculty", "name") // Populate module details

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json(quiz);
    } catch (error) {
        console.error("Error fetching quiz:", error);
        res.status(500).json({ message: "Failed to fetch quiz", error: error.message });
    }
});

// Update a quiz by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, description, faculty, year, module, duration, questions } = req.body;

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                faculty,
                year,
                module,
                duration,
                questions,
            },
            { new: true } // Return the updated document
        )
            .populate("faculty") // Populate faculty details
            .populate("module"); // Populate module details

        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json(updatedQuiz);
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ message: "Failed to update quiz", error: error.message });
    }
});

// Get all quizzes by module ID
router.get("/module/:moduleId", async (req, res) => {
    try {
        const { moduleId } = req.params;

        // Find all quizzes that belong to the specified module
        const quizzes = await Quiz.find({ module: moduleId })
            .populate("module")
            .populate("faculty", "name")
            .populate("questions");

        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ message: "No quizzes found for this module" });
        }

        res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes by module:", error);
        res.status(500).json({ message: "Failed to fetch quizzes by module", error: error.message });
    }
});

// Delete a quiz by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!deletedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: "Failed to delete quiz", error: error.message });
    }
});

module.exports = router;