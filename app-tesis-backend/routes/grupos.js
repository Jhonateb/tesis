// routes/grupos.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const gruposController = require('../controllers/gruposController');

// Por ahora, solo definiremos una ruta de prueba
router.get('/', auth, (req, res) => {
  res.send('Ruta de grupos funcionando');
});

module.exports = router;