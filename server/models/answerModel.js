// צביה פיירמן 
// מודל תשובה
const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  rawScore: { type: Number, min: -2, max: 5, required: true },
  finalScore: { type: Number, required: true },
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;