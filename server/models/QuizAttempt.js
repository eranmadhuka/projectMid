const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
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
    attemptNumber: {
        type: Number,
        required: true,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('QuizAttempt', QuizAttemptSchema);
