// models/Emotion.js
import mongoose from 'mongoose';

const emotionSchema = new mongoose.Schema({
  userId: String,
  answers: [String],
  sleepHours: Number,
  emotionCounts: Object,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Emotion', emotionSchema);
