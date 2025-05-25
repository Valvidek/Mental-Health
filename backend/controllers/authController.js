const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Бүх талбарыг бөглөнө үү.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'И-мэйл аль хэдийн ашиглагдсан байна.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    // hasAnsweredQuestions автоматаар false болно
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(201).json({ message: 'Хэрэглэгч амжилттай бүртгэгдлээ.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Серверийн алдаа.' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Имэйл болон нууц үг шаардлагатай.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Имэйл эсвэл нууц үг буруу.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Имэйл эсвэл нууц үг буруу.' });
    }

    // Амжилттай нэвтрэлтийн хариу
    res.json({
      message: 'Амжилттай нэвтэрлээ.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        hasAnsweredQuestions: user.hasAnsweredQuestions,  // энд нэмлээ
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Серверийн алдаа.' });
  }
};
