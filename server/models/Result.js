// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the student
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Reference to the quiz
    attempts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attempt' }], // All attempts made by the student
    bestScore: { type: Number, default: 0 }, // Best score across all attempts
});

module.exports = mongoose.model('Result', resultSchema);