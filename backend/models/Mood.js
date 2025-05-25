// mood.model.js (эсвэл mood.js)
const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  journalEntry: { type: String, required: true },
  affirmation: { type: String, required: true },
  sleepQuality: { type: Number, required: true },
  selectedHour: { type: Number, required: true },
  selectedFocus: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mood', MoodSchema);
