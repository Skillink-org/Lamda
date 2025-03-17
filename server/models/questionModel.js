const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: { type: String },
    testCode: { type: String, required: true, ref: "Test" }, // רפרנס למבחן
    category: { type: String, required: true, ref: "Category" }, // רפרנס למבחן
    isPositive: { type: Boolean, required: true },
    scores: [
        {
            orderInTest: { type: Number, required: true }, // תכונה חיובית
            weight: { type: Number, required: true, default: 1 }  // תכונה שלילית
        }
    ]
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
