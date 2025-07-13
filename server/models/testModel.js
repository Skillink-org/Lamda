//test model
const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  duration: { type: Number },
  lastUpdated: { type: Date, default: Date.now },
  creratedAt: { type: Date, default: Date.now },
  categoryOrder: { type: Array, default: [] }
}, { timestamps: true });

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
