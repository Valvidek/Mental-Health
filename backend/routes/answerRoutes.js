const express = require('express');
const router = express.Router();
const { saveAnswer, getUserAnswers } = require('../controllers/answerController');

router.post('/', saveAnswer);
router.get('/:userId', getUserAnswers);

module.exports = router;
