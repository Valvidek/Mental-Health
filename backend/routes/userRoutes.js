const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User олдсонгүй' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Алдаа гарлаа' });
  }
});

module.exports = router;
