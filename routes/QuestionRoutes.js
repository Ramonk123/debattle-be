const express = require('express');
const router = express.Router();
const questionController = require('../controllers/QuestionController');


router.get('/:id', questionController.getQuestion);
router.get('', questionController.getQuestions);
router.post('', questionController.addQuestion);
router.put('/:id', questionController.editQuestion);
router.delete('/:id', questionController.removeQuestion);

module.exports = router
