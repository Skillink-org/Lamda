const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    testCode: { type: String, required: true, ref: "Test" }, // רפרנס למבחן
    traits: {
        positive: { type: String, required: true }, // תכונה חיובית
        negative: { type: String, required: true }  // תכונה שלילית
    }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
