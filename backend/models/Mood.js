const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  journalEntry: { type: String, default: '' },
  affirmation: { type: String, default: '' },
  sleepQuality: { type: Number, default: 0 },
  selectedHour: { type: Number, default: 0 },
  selectedFocus: { type: Number, default: null },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mood', MoodSchema);
