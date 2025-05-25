// controllers/authController.js
import User from '../models/User.js';


exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🔍 hasAnsweredQuestions талбар байгаа эсэхийг шалгах
    const hasAnsweredQuestions = user.hasAnsweredQuestions || false;

    res.json({
      user: {
        email: user.email,
        hasAnsweredQuestions,
      },
      token: 'dummy-jwt-token', // хүсвэл JWT ашиглаж болно
    });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
