// controllers/answerController.js
exports.submitAnswers = async (req, res) => {
  const { email, answers } = req.body;

  try {
    // Хариултыг хадгална...
    // Дараа нь хэрэглэгч дээр тэмдэг тавина
    await User.findOneAndUpdate(
      { email },
      { hasAnsweredQuestions: true }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Could not save answers' });
  }
};
