const express = require('express');
const router = express.Router();
const { saveMood } = require('../controllers/moodController');

router.post('/', saveMood);

module.exports = router;
