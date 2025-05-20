const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: String,
});

module.exports = mongoose.model('Todo', TodoSchema);
