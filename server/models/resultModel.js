// Tzivya Fireman
// result model
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true }, 
  categoryResults: [{
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
    percentage: { type: Number, min: 0, max: 100, required: true }
  }],
  personalityTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalityType', default: null }, 
  personalityTypeMatch: { type: Number, default: null }, 
  isComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;
