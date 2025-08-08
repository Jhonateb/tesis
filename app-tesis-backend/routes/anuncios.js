// /routes/anuncios.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    obtenerAnuncios,
    crearAnuncioDirecto,
    solicitarAnuncio,
    obtenerSolicitudesPendientes,
    gestionarSolicitudAnuncio
} = require('../controladores/anuncioController');

router.get('/', auth, obtenerAnuncios);

router.post('/solicitar', auth, solicitarAnuncio);

router.post('/crear', auth, crearAnuncioDirecto);

router.get('/solicitudes', auth, obtenerSolicitudesPendientes);

router.put('/gestionar/:anuncio_id', auth, gestionarSolicitudAnuncio);


module.exports = router;