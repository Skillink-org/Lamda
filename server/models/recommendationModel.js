const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
    testCode: { type: String, required: true, ref: "Test" }, // רפרנס למבחן
    personalityString: { type: String, required: true },
    title: { type: String, required: true },
    general: { type: String },
    recommendations: [{ type: String }]
}, { timestamps: true });

const Recommendation = mongoose.model("Recommendation", recommendationSchema);
module.exports = Recommendation;
