const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        module: {
            type: String,
            required: [true, "Module is required"],
            trim: true,
        },
        moduleCode: {
            type: String,
            required: [true, "Module code is required"],
            trim: true,
        },
        file: {
            type: String, // Stores the file path
            required: [true, "File is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);