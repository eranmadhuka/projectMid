const express = require("express");
const StudyMaterial = require("../models/studyMaterial");
const upload = require("../utils/upload");
const { unlink } = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");

const router = express.Router();

// Add a new study material
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const { title, description, module, moduleCode } = req.body;
        const file = req.file ? req.file.filename : null;

        const newMaterial = new StudyMaterial({
            title,
            description,
            module,
            moduleCode,
            file,
        });

        await newMaterial.save();
        res.status(201).json(newMaterial);
    } catch (error) {
        console.error("Error in POST /api/study-materials:", error);
        res.status(500).json({ message: error.message });
    }
});

// Get all study materials
router.get("/", async (req, res) => {
    try {
        const materials = await StudyMaterial.find();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single study material by ID
router.get("/:id", async (req, res) => {
    try {
        const material = await StudyMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: "Study material not found" });
        }
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a study material by ID
router.put("/:id", upload.single("file"), async (req, res) => {
    try {
        const { title, description, module, moduleCode } = req.body;
        const file = req.file ? req.file.filename : null;

        const material = await StudyMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: "Study material not found" });
        }

        // Delete the old file if a new file is uploaded
        if (file && material.file) {
            await unlink(path.join("uploads/studyMaterials", material.file));
        }

        // Update fields
        material.title = title;
        material.description = description;
        material.module = module;
        material.moduleCode = moduleCode;
        material.file = file || material.file; // Keep the old file if no new file is uploaded

        await material.save();
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a study material by ID
router.delete("/:id", async (req, res) => {
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidId) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const material = await StudyMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ message: "Study material not found" });
        }

        // Delete the associated file
        if (material.file) {
            const filePath = path.join(__dirname, "..", "uploads/studyMaterials", material.file);
            try {
                await unlink(filePath);
            } catch (error) {
                if (error.code !== "ENOENT") {
                    // Ignore "file not found" errors
                    throw error;
                }
            }
        }

        // Delete the document from the database
        await StudyMaterial.deleteOne({ _id: material._id });

        res.status(200).json({ message: "Study material deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE /api/study-materials/:id:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;