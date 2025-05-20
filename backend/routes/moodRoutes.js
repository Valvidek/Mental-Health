const express = require('express');
const router = express.Router();
const { getMoods, createMood } = require('../controllers/moodController');

router.get('/', getMoods);
router.post('/', createMood);

module.exports = router;
