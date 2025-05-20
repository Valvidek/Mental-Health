const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionIndex: Number,
  response: String,
  userId: String,
}, { timestamps: true });

module.exports = mongoose.model('Answer', AnswerSchema);
