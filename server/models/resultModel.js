// צביה פיירמן
// result model
const mongoose = require('mongoose');
const AnswerSchema = require('./answerModel').schema;
const CategoryResultSchema = require('./categoryResultModel').schema;

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },//יהיה צורך להתאים בדיוק לשם של הסכמה יוזר
  testCode: { type: String, ref: 'Test', required: true },
  answers: [AnswerSchema],
  categoryResults: [CategoryResultSchema],
  personalityString: { type: String, required: true },
  isComplete: { type: Boolean, default: false },
  completedAt: { type: Date },
  createdAt: { type: Date },
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;
