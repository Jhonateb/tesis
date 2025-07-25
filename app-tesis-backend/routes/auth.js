const express = require('express');
const router = express.Router();
const authController = require('../controladores/authController');

router.post('/google-login', authController.googleLogin);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;