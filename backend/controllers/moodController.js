const Mood = require('../models/Mood');

exports.saveMood = async (req, res) => {
  try {
    console.log('Mood model:', Mood);  

    const { mood, journalEntry, affirmation, sleepQuality, selectedHour, selectedFocus } = req.body;

    if (!mood || !journalEntry || !affirmation || sleepQuality === undefined || selectedHour === undefined || selectedFocus === undefined) {
      return res.status(400).json({ error: 'Бүх талбаруудыг бөглөнө үү.' });
    }

    const newMood = new Mood({
      mood,
      journalEntry,
      affirmation,
      sleepQuality,
      selectedHour,
      selectedFocus,
    });

    await newMood.save();

    res.status(201).json({ message: 'Амжилттай хадгаллаа!' });
  } catch (error) {
    console.error('Error saving mood:', error);
    res.status(500).json({ error: 'Сервер дотор алдаа гарлаа.' });
  }
};
