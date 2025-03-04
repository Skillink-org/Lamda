// Tzivya Fireman
// recommendation model
const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  testCode: { type: String, ref: 'Test', required: true },
  personalityString: { type: String, required: true },
  title: { type: String, required: true },
  general: { type: String, default: '',},
  recommendations: [{ type: String , default: []}],
});

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

module.exports = Recommendation;