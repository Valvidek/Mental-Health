const Mood = require('../models/Mood');

exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: 'Унших үед алдаа гарлаа' });
  }
};

exports.createMood = async (req, res) => {
  try {
    const { mood, journalEntry, affirmation, sleepQuality, selectedHour, selectedFocus } = req.body;

    if (!mood) return res.status(400).json({ error: 'Mood шаардлагатай' });

    const newMood = new Mood({ mood, journalEntry, affirmation, sleepQuality, selectedHour, selectedFocus });
    await newMood.save();
    res.status(201).json({ message: 'Mood хадгалагдлаа', mood: newMood });
  } catch (err) {
    res.status(500).json({ error: 'Хадгалах үед алдаа гарлаа' });
  }
};
