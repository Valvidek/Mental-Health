require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const moodRoutes = require('./routes/moodRoutes');
const answerRoutes = require('./routes/answerRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/answers', answerRoutes);


// Basic root route
app.get('/', (req, res) => res.send('🚀 Сервер ажиллаж байна'));

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер порт ${PORT} дээр аслаа`));
