//test model
const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  duration: { type: Number },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
