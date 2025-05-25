// controllers/answerController.js
const Answer = require('../models/Answer');

exports.saveAnswers = async (req, res) => {
  const { userId, answers } = req.body;

  if (!userId || !answers) {
    return res.status(400).json({ message: 'userId болон answers шаардлагатай' });
  }

  try {
    const newAnswer = new Answer({
      userId,
      answers,
    });

    await newAnswer.save();

    return res.status(201).json({ message: 'Хариулт амжилттай хадгалагдлаа' });
  } catch (error) {
    console.error('Хадгалах үед алдаа:', error);
    return res.status(500).json({ message: 'Серверийн алдаа гарлаа' });
  }
};
