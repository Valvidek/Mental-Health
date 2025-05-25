// controllers/emotionController.js
import Emotion from '../models/Emotion.js';

export const submitAnswers = async (req, res) => {
  try {
    const { userId, answers, sleepHours } = req.body;

    const emotionCounts = {
      angry: 0,
      sad: 0,
      anxious: 0,
      bored: 0,
    };

    answers.forEach((ans) => {
      if (emotionCounts.hasOwnProperty(ans)) {
        emotionCounts[ans]++;
      }
    });

    const newEntry = await Emotion.create({
      userId,
      answers,
      sleepHours,
      emotionCounts,
    });
    await User.findByIdAndUpdate(userId, { hasAnsweredQuestions: true });


    res.status(200).json({ message: 'Submitted successfully', data: newEntry });
  } catch (err) {
    console.error('❌ Submission error:', err);
    res.status(500).json({ error: 'Server error while submitting answers' });
  }
};
