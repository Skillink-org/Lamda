const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"] 
  },
  subject: { type: String, required: true, maxlength: 100 },
  message: { type: String, required: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
