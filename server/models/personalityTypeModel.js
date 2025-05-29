// Tzivya Fireman
// Personality Type model (Relevant just for MBTI)
const mongoose = require('mongoose');

const PersonalityTypeSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  personalityString: { type: String, required: true, unique: true, minlength: 4, maxlength: 4 }, 
  title: { type: String, required: true, unique: true }, 
  description: { type: String, required: true },
  recommendations: [{ type: String }],
  conclusions: [{ type: String }]
});

const PersonalityType = mongoose.model('PersonalityType', PersonalityTypeSchema);

module.exports = PersonalityType;
