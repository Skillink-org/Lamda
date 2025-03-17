const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // שם המבחן
    code: { type: String, required: true, unique: true }, // קוד ייחודי
    description: { type: String }, // תיאור המבחן
    isActive: { type: Boolean, default: true }, // האם פעיל
    categoryOrder: { type: [String], required: true }, // סדר הקטגוריות למחרוזת הסופית
    duration: { type: Number }, // משך זמן משוער של המבחן
    scoreCalculationMethod: { type: String }, // שיטת החישוב
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
