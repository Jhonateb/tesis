// /routes/grupos.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 

const { verificarGrupoUsuario, unirseAGrupo, crearGrupo, obtenerDatosInicio, salirseDeGrupo, listarMisGrupos, cambiarGrupoActivo  } = require('../controladores/grupoController');

router.get('/verificar', auth, verificarGrupoUsuario);

router.post('/unirse', auth, unirseAGrupo);

router.post('/crear', auth, crearGrupo);

router.get('/inicio', auth, obtenerDatosInicio);

router.delete('/salirse', auth, salirseDeGrupo);

router.get('/mis-grupos', auth, listarMisGrupos);

router.post('/cambiar-activo', auth, cambiarGrupoActivo);

module.exports = router;