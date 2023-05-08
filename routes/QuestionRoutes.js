const express = require('express');
const router = express.Router();
const questionController = require('../controllers/QuestionController');
const {verifyToken} = require('../middleware/AuthenticationHandler');

router.get('/:id', questionController.getQuestion);
router.get('', questionController.getQuestions);
router.post('', verifyToken , questionController.addQuestion);
router.patch('/:id',verifyToken, questionController.editQuestion);
router.delete('/:id',verifyToken, questionController.removeQuestion);

module.exports = router;
