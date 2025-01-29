const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Question text is required"],
    },
    type: {
        type: String,
        enum: ["multiple-choice", "checkbox"],
        required: [true, "Question type is required"],
    },
    options: {
        type: [String],
        required: function () {
            return this.type === "multiple-choice" || this.type === "checkbox";
        },
    },
    correctAnswer: {
        type: mongoose.Schema.Types.Mixed,
        required: function () {
            return this.type === "multiple-choice";
        },
    },
    correctAnswers: {
        type: [Number],
        required: function () {
            return this.type === "checkbox";
        },
    },
    marks: {
        type: Number,
        required: [true, "Marks are required"],
        min: [1, "Marks must be at least 1"],
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: [true, "Quiz reference is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Question", QuestionSchema);