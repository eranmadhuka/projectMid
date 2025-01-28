const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Quiz title is required"],
    },
    description: {
        type: String,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        required: [true, "Faculty is required"],
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: [true, "Module is required"],
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        },
    ],
    duration: {
        type: Number, // in minutes
        required: [true, "Duration is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Quiz", QuizSchema);