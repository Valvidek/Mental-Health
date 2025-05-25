require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const answerRoutes = require('./routes/answerRoutes');
const quoteProxyRoutes = require('./models/quoteProxy');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api', quoteProxyRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('🚀 Сервер ажиллаж байна'));

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Сервер порт ${PORT} дээр ажиллаж байна`);
});

