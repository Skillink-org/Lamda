const mongoose = require('mongoose');

const UserTestResultsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  categoryResults: [
    {
      categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
      percentage: { type: Number, required: true, min: 0, max: 100 }
    }
  ],
  personalityTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonalityType', default: null },
  personalityTypeMatch: { type: Number, default: null }, 
  isComplete: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

const UserTestResults = mongoose.model('UserTestResults', UserTestResultsSchema);

module.exports = UserTestResults;
