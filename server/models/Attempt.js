// models/Attempt.js
const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    answers: [
        {
            question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
            answer: { type: mongoose.Schema.Types.Mixed },
        },
    ],
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Attempt', attemptSchema);