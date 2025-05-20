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
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(201).json({ message: 'Хэрэглэгч бүртгэгдлээ' });
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Имэйл эсвэл нууц үг буруу' });
    }

    res.json({ message: 'Амжилттай нэвтэрлээ', user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};
