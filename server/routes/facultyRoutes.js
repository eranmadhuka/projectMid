const express = require('express');
const Faculty = require('../models/Faculty');
const Module = require('../models/Module'); // Import the Module model

const router = express.Router();

// Create a new faculty
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if faculty already exists
        const existingFaculty = await Faculty.findOne({ name });
        if (existingFaculty) {
            return res.status(400).json({ message: "Faculty already exists" });
        }

        // Create new faculty
        const newFaculty = new Faculty({ name, description });
        await newFaculty.save();

        res.status(201).json(newFaculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all faculties
router.get("/", async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch modules by faculty
// router.get("/", async (req, res) => {
//     try {
//         const { faculty } = req.query;

//         if (!faculty) {
//             return res.status(400).json({ message: "Faculty is required" });
//         }

//         const modules = await Module.find({ faculty });
//         res.status(200).json(modules);
//     } catch (error) {
//         console.error("Error fetching modules:", error);
//         res.status(500).json({ message: "Failed to fetch modules", error: error.message });
//     }
// });

// Get a single faculty by ID
router.get("/:id", async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }
        res.status(200).json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a faculty by ID
router.put("/:id", async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true } // Return the updated document
        );

        if (!updatedFaculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        res.status(200).json(updatedFaculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a faculty by ID and cascade delete its modules
router.delete("/:id", async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) {
            return res.status(404).json({ message: "Faculty not found" });
        }

        // Delete the faculty (this will trigger the pre-delete hook)
        await faculty.deleteOne();

        res.status(200).json({ message: "Faculty and associated modules deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;