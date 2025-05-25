const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mood: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
