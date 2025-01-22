const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Question text is required"],
    },
    type: {
        type: String,
        enum: ["true-false", "multiple-choice", "checkbox"],
        required: [true, "Question type is required"],
    },
    options: {
        type: [String],
        required: function () {
            return this.type === "multiple-choice" || this.type === "checkbox";
        },
    },
    correctAnswer: {
        type: mongoose.Schema.Types.Mixed, // Can be String or Array
        required: [true, "Correct answer is required"],
    },
});

module.exports = QuestionSchema;