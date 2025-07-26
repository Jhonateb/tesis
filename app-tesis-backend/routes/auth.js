const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerUser, loginUser, googleLogin } = require('../controladores/authController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/google-login', googleLogin);

router.get('/me', auth, (req, res) => {
  res.json({ msg: 'Esta es una ruta protegida', usuario: req.usuario });
});


module.exports = router;