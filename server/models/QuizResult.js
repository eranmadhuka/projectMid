const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    incorrectAnswers: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    flaggedQuestions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],
    submittedAnswers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question',
                required: true,
            },
            answer: {
                type: mongoose.Schema.Types.Mixed, // Support string/array based on question type
                required: true,
            },
        },
    ],
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
