const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionIndex: {
    type: Number,
    required: true,
  },
  response: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // хүсвэл хэрэглэгчтэй холбож болно
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;