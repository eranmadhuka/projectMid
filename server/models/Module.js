const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
    {
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty", // Reference to the Faculty schema
            required: [true, "Faculty is required"],
        },
        year: {
            type: String,
            required: [true, "Year is required"],
            enum: ["Year 1", "Year 2", "Year 3", "Year 4"],
        },
        moduleName: {
            type: String,
            required: [true, "Module name is required"],
            trim: true,
        },
        moduleCode: {
            type: String,
            required: [true, "Module code is required"],
            trim: true,
            unique: true,
        },
    },
    { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;