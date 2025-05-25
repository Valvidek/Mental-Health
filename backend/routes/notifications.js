// routes/notifications.js
const express = require('express');
const router = express.Router();
const PushToken = require('../models/PushToken');

router.post('/save-token', async (req, res) => {
  const { userId, token } = req.body;
  try {
    await PushToken.findOneAndUpdate({ userId }, { token }, { upsert: true });
    res.status(200).send('Token saved');
  } catch (err) {
    res.status(500).send('Error saving token');
  }
});

module.exports = router;
