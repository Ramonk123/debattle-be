const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/AuthController');

router.post('/login', authenticationController.login);
router.post('/logout', authenticationController.logout);
router.post('/register', authenticationController.createUser);

module.exports = router;
