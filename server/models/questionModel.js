//question model
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  categoryId: { type: String, ref: "Category", required: true },
  isPositive: { type: Boolean }, //relevant just in MBTI
  order: { type: Number, required: true },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
