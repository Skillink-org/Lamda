//category model
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // example:"ei"
  description: { type: String }, //relevant in Holand and another tests, not in MBTI
  testId: { type: String, ref: "Test", required: true }, // Foreign key
  positive: { type: String }, //relevant just in MBTI. example:e
  negative: { type: String }, //relevant just in MBTI. example:i
  order: { type: Number }, //relevant just in MBTI
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
