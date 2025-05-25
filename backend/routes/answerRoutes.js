// routes/answerRoutes.js
const express = require('express');
const router = express.Router();
const { saveAnswers } = require('../controllers/answerController');

router.post('/', saveAnswers);

module.exports = router;
