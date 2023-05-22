const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthController');

router.post('/login', authenticationController.login);
router.post('/register', authenticationController.createUser);

module.exports = router;
