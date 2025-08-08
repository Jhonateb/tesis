// /controladores/anuncioController.js
const pool = require('../db');

exports.obtenerAnuncios = async (req, res) => {
  const { id: usuario_id } = req.usuario;
  try {
    const usuarioInfo = await pool.query("SELECT grupo_activo_id FROM usuarios WHERE usuario_id = $1", [usuario_id]);
    const grupo_id = usuarioInfo.rows[0]?.grupo_activo_id;
    if (!grupo_id) {
      return res.status(404).json({ msg: 'No tienes un grupo activo seleccionado.' });
    }

    const anuncios = await pool.query(
      `SELECT anuncio_id, titulo, descripcion, fecha_evento, ubicacion, adjuntos
       FROM anuncios
       WHERE grupo_id = $1 AND activo = true AND estado = 'aprobado'
       ORDER BY fecha_evento ASC`,
      [grupo_id]
    );
    res.json(anuncios.rows);
  } catch (err) {
    console.error('Error en obtenerAnuncios:', err.stack);
    res.status(500).send('Error en el servidor al obtener anuncios.');
  }
};

exports.crearAnuncioDirecto = async (req, res) => {
  const { titulo, descripcion, fecha_evento, ubicacion } = req.body;
  const { id: usuario_id } = req.usuario;

  try {
    const usuarioInfo = await pool.query("SELECT grupo_activo_id FROM usuarios WHERE usuario_id = $1", [usuario_id]);
    const grupo_id = usuarioInfo.rows[0]?.grupo_activo_id;
    if (!grupo_id) return res.status(400).json({ msg: 'No tienes un grupo activo.' });

    const miembroInfo = await pool.query("SELECT rol_id FROM miembros_grupo WHERE usuario_id = $1 AND grupo_id = $2", [usuario_id, grupo_id]);
    const rol_id = miembroInfo.rows[0]?.rol_id;
    if (![1, 2, 3].includes(rol_id)) { 
      return res.status(403).json({ msg: 'No tienes permiso para crear anuncios directamente.' });
    }

    const nuevoAnuncio = await pool.query(
      `INSERT INTO anuncios (grupo_id, titulo, descripcion, fecha_evento, ubicacion, usuario_ingreso, estado, aprobado_por_id)
       VALUES ($1, $2, $3, $4, $5, $6, 'aprobado', $6) RETURNING *`,
      [grupo_id, titulo, descripcion, fecha_evento, ubicacion, usuario_id]
    );

    res.status(201).json({ msg: 'Anuncio creado y aprobado exitosamente', anuncio: nuevoAnuncio.rows[0] });
  } catch (err) {
    console.error('Error en crearAnuncioDirecto:', err.stack);
    res.status(500).send('Error en el servidor.');
  }
};

exports.solicitarAnuncio = async (req, res) => {
    const { titulo, descripcion, fecha_evento, ubicacion } = req.body;
    const { id: usuario_id } = req.usuario;

    try {
        const usuarioInfo = await pool.query("SELECT grupo_activo_id FROM usuarios WHERE usuario_id = $1", [usuario_id]);
        const grupo_id = usuarioInfo.rows[0]?.grupo_activo_id;
        if (!grupo_id) return res.status(400).json({ msg: 'No tienes un grupo activo.' });

        const nuevoAnuncio = await pool.query(
            `INSERT INTO anuncios (grupo_id, titulo, descripcion, fecha_evento, ubicacion, usuario_ingreso, estado, solicitado_por_id)
             VALUES ($1, $2, $3, $4, $5, $6, 'pendiente', $6) RETURNING *`,
            [grupo_id, titulo, descripcion, fecha_evento, ubicacion, usuario_id]
        );


        res.status(202).json({ msg: 'Solicitud de anuncio enviada para aprobación.', anuncio: nuevoAnuncio.rows[0] });

    } catch (err) {
        console.error('Error en solicitarAnuncio:', err.stack);
        res.status(500).send('Error en el servidor.');
    }
};

exports.obtenerSolicitudesPendientes = async (req, res) => {
    const { id: usuario_id } = req.usuario;
    try {
        const usuarioInfo = await pool.query("SELECT grupo_activo_id FROM usuarios WHERE usuario_id = $1", [usuario_id]);
        const grupo_id = usuarioInfo.rows[0]?.grupo_activo_id;
        if (!grupo_id) return res.status(400).json({ msg: 'No tienes un grupo activo.' });

        const miembroInfo = await pool.query("SELECT rol_id FROM miembros_grupo WHERE usuario_id = $1 AND grupo_id = $2", [usuario_id, grupo_id]);
        const rol_id = miembroInfo.rows[0]?.rol_id;
        if (rol_id !== 1) { 
            return res.status(403).json({ msg: 'No tienes permiso para ver las solicitudes.' });
        }

        const solicitudes = await pool.query(
            `SELECT a.*, u.nombre_completo as solicitante_nombre 
             FROM anuncios a
             JOIN usuarios u ON a.solicitado_por_id = u.usuario_id
             WHERE a.grupo_id = $1 AND a.estado = 'pendiente'`,
            [grupo_id]
        );
        res.json(solicitudes.rows);

    } catch (err) {
        console.error('Error en obtenerSolicitudesPendientes:', err.stack);
        res.status(500).send('Error en el servidor.');
    }
};

exports.gestionarSolicitudAnuncio = async (req, res) => {
    const { anuncio_id } = req.params;
    const { decision } = req.body; 
    const { id: admin_id } = req.usuario;

    if (!['aprobado', 'rechazado'].includes(decision)) {
        return res.status(400).json({ msg: 'La decisión debe ser "aprobado" o "rechazado".' });
    }

    try {
        const resultado = await pool.query(
            `UPDATE anuncios SET estado = $1, aprobado_por_id = $2, fecha_modifica = NOW() 
             WHERE anuncio_id = $3 AND estado = 'pendiente' RETURNING *`,
            [decision, admin_id, anuncio_id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ msg: 'No se encontró la solicitud o ya fue gestionada.' });
        }
        

        res.json({ msg: `Anuncio ${decision} exitosamente.`, anuncio: resultado.rows[0] });

    } catch (err) {
        console.error('Error en gestionarSolicitudAnuncio:', err.stack);
        res.status(500).send('Error en el servidor.');
    }
};