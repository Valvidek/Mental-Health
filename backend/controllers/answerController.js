const Answer = require('../models/Answer');

exports.saveAnswer = async (req, res) => {
  try {
    const { questionIndex, response, userId } = req.body;
    if (questionIndex === undefined || response === undefined) {
      return res.status(400).json({ error: 'questionIndex болон response шаардлагатай' });
    }

    const answer = new Answer({ questionIndex, response, userId });
    await answer.save();
    res.status(201).json({ message: 'Хариулт хадгалагдлаа', answer });
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};

exports.getUserAnswers = async (req, res) => {
  try {
    const { userId } = req.params;
    const answers = await Answer.find({ userId }).sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};
