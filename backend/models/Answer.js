// models/Answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  answers: { type: Map, of: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Answer', answerSchema);
