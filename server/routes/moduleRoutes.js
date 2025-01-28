const express = require("express");
const Module = require("../models/Module.js");
const Faculty = require("../models/Faculty.js");
const mongoose = require("mongoose");

const router = express.Router();

// Add a new module
router.post("/", async (req, res) => {
    try {
        const { facultyId, year, moduleName, moduleCode } = req.body;

        // Validate facultyId
        if (!mongoose.Types.ObjectId.isValid(facultyId)) {
            console.log("Invalid faculty ID:", facultyId);
            return res.status(400).json({ message: "Invalid faculty ID" });
        }

        // Check if faculty exists
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            console.log("Faculty not found:", facultyId);
            return res.status(404).json({ message: "Faculty not found" });
        }

        // Create the module
        const newModule = new Module({
            faculty: facultyId,
            year,
            moduleName,
            moduleCode,
        });

        await newModule.save();

        // Add the module to the faculty's modules array
        faculty.modules.push(newModule._id);
        await faculty.save();

        res.status(201).json(newModule);
    } catch (error) {
        console.error("Error in POST /api/modules:", error); // Log error
        res.status(500).json({ message: error.message });
    }
});

// Update a module by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { facultyId, year, moduleName, moduleCode } = req.body;

        // Validate the module ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid module ID" });
        }

        // Check if the module exists
        const module = await Module.findById(id);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        // Validate the faculty ID if it's being updated
        if (facultyId && !mongoose.Types.ObjectId.isValid(facultyId)) {
            return res.status(400).json({ message: "Invalid faculty ID" });
        }

        // Check if the new faculty exists (if facultyId is provided)
        if (facultyId) {
            const faculty = await Faculty.findById(facultyId);
            if (!faculty) {
                return res.status(404).json({ message: "Faculty not found" });
            }

            // Remove the module from the old faculty's modules array
            await Faculty.findByIdAndUpdate(module.faculty, {
                $pull: { modules: module._id },
            });

            // Add the module to the new faculty's modules array
            faculty.modules.push(module._id);
            await faculty.save();

            // Update the module's faculty reference
            module.faculty = facultyId;
        }

        // Update other fields if provided
        if (year) module.year = year;
        if (moduleName) module.moduleName = moduleName;
        if (moduleCode) module.moduleCode = moduleCode;

        // Save the updated module
        await module.save();

        res.status(200).json(module);
    } catch (error) {
        console.error("Error in PUT /api/modules/:id:", error); // Log error
        res.status(500).json({ message: error.message });
    }
});

// Get all modules for a specific faculty
router.get("/faculty/:facultyId", async (req, res) => {
    try {
        const modules = await Module.find({ faculty: req.params.facultyId });
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single module by ID
router.get("/:id", async (req, res) => {
    try {
        const module = await Module.findById(req.params.id)
            .populate("faculty", "name"); // Populate faculty details (only the 'name' field)

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.status(200).json(module);
    } catch (error) {
        console.error("Error fetching module:", error);
        res.status(500).json({ message: "Failed to fetch module", error: error.message });
    }
});

// Get modules by faculty ID and year
router.get("/faculty/:facultyId/year/:year", async (req, res) => {
    try {
        const { facultyId, year } = req.params;

        // Validate facultyId
        if (!mongoose.Types.ObjectId.isValid(facultyId)) {
            return res.status(400).json({ message: "Invalid faculty ID" });
        }

        // Fetch modules for the given faculty and year
        const modules = await Module.find({ faculty: facultyId, year: year });

        res.status(200).json(modules);
    } catch (error) {
        console.error("Error fetching modules by faculty and year:", error);
        res.status(500).json({ message: "Failed to fetch modules", error: error.message });
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

// Delete a module by ID
router.delete("/:id", async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        // Remove the module from the faculty's modules array
        await Faculty.findByIdAndUpdate(module.faculty, {
            $pull: { modules: module._id },
        });

        await module.deleteOne();
        res.status(200).json({ message: "Module deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all modules
router.get("/", async (req, res) => {
    try {
        const modules = await Module.find({}).populate("faculty");
        res.status(200).json(modules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;