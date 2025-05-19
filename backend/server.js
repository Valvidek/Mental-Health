require('dotenv').config(); // Load .env file

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const Todo = require('./models/Todo');
const UserAnswer = require('./models/Answer');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI тохиргоо байхгүй байна. .env файлыг шалгана уу.');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB холбогдлоо'))
  .catch(err => {
    console.error('❌ MongoDB алдаа:', err);
    process.exit(1);
  });

// Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mood: String,
  date: { type: Date, default: Date.now },
});

const MoodSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  journalEntry: { type: String, default: '' },
  affirmation: { type: String, default: '' },
  sleepQuality: { type: Number, default: 0 },
  selectedHour: { type: Number, default: 0 },
  selectedFocus: { type: Number, default: null },
  date: { type: Date, default: Date.now },
});



const User = mongoose.model('User', UserSchema);
const Mood = mongoose.model('Mood', MoodSchema);


// Routes
app.get('/', (req, res) => {
  res.send('🚀 Сервер амжилттай ажиллаж байна.');
});

// Signup
app.post('/signup', async (req, res) => {
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

    res.status(201).json({ message: 'Хэрэглэгч амжилттай бүртгэгдлээ' });
  } catch (err) {
    console.error('❌ Signup алдаа:', err);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

// Signin
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Имэйл болон нууц үг шаардлагатай.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Имэйл бүртгэлгүй байна.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Нууц үг буруу байна.' });
    }

    res.json({ message: 'Амжилттай нэвтэрлээ', user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('❌ Signin алдаа:', err);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

// Todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Todo хоосон байна' });
    }

    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json({ message: 'Todo нэмэгдлээ', todo: newTodo });
  } catch (err) {
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

app.post('/answers', async (req, res) => {
  try {
    const { questionIndex, response, userId } = req.body;
    if (questionIndex === undefined || response === undefined) {
      return res.status(400).json({ error: 'questionIndex болон response шаардлагатай.' });
    }

    const newAnswer = new Answer({ questionIndex, response, userId });
    await newAnswer.save();

    res.status(201).json({ message: 'Хариулт хадгалагдлаа', answer: newAnswer });
  } catch (error) {
    console.error('Answer хадгалах алдаа:', error);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});

// Хэрэглэгчийн бүх хариултуудыг авах GET маршрут
app.get('/answers/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const answers = await Answer.find({ userId }).sort({ createdAt: -1 });
    res.json(answers);
  } catch (error) {
    console.error('Answer авах алдаа:', error);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
});
// POST: Mood хадгалах
// app.post('/moods', async (req, res) => {
//   try {
//     const { mood } = req.body;
//     if (!mood) {
//       return res.status(400).json({ error: 'Mood утга шаардлагатай.' });
//     }
//     const newMood = new Mood({ mood });
//     await newMood.save();
//     res.status(201).json({ message: 'Mood хадгалагдлаа', mood: newMood });
//   } catch (error) {
//     res.status(500).json({ error: 'Хадгалах үед алдаа гарлаа' });
//   }
// });

// GET: Бүх moods авах
app.get('/moods', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: 'Унших үед алдаа гарлаа' });
  }
});

// POST: Mood хадгалах

app.post('/moods', async (req, res) => {
  console.log('Request body:', req.body);

  try {
    const {
      mood,
      journalEntry = '',
      affirmation = '',
      sleepQuality = 0,
      selectedHour = 0,
      selectedFocus = null
    } = req.body;

    if (!mood) {
      return res.status(400).json({ error: 'Mood утга шаардлагатай.' });
    }

    const newMood = new Mood({
      mood,
      journalEntry,
      affirmation,
      sleepQuality,
      selectedHour,
      selectedFocus
    });

    await newMood.save();

    res.status(201).json({ message: 'Mood хадгалагдлаа', mood: newMood });
  } catch (error) {
    console.error('Error saving mood:', error);
    res.status(500).json({ error: 'Хадгалах үед алдаа гарлаа' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Сервер порт ${PORT} дээр 0.0.0.0 дээр аслаа`);
});
