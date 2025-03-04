// Tzivya Fireman
//category result model
const mongoose = require('mongoose');

const CategoryResultSchema = new mongoose.Schema({
  categoryCode: { type: String, required: true },
  score: { type: Number, required: true },
  percentage: { type: Number, min: 0, max: 100, required: true },
  selectedTrait: { type: String, required: true },
});

const CategoryResult = mongoose.model('CategoryResult', CategoryResultSchema);

module.exports = CategoryResult;