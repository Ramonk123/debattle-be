const express = require('express');
const userController = require('../controllers/UserController');
const {verifyToken} = require('../middleware/AuthenticationHandler');
const router = express.Router();

router.post('/:id', userController.updateProgress);//Add verifyToken method
router.get('/:id', userController.getProgress);

module.exports = router;
