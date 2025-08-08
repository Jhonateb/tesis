// /controladores/grupoController.js
const pool = require('../db');
const { customAlphabet } = require('nanoid');

exports.verificarGrupoUsuario = async (req, res) => {
  try {
    const { id: usuario_id } = req.usuario;

    const grupoUsuario = await pool.query(
      `SELECT g.grupo_id, g.nombre, mg.rol_id 
       FROM miembros_grupo mg
       JOIN grupos g ON mg.grupo_id = g.grupo_id
       WHERE mg.usuario_id = $1 AND mg.estado = true`,
      [usuario_id]
    );

    if (grupoUsuario.rows.length > 0) {
      return res.json({ tieneGrupo: true, grupo: grupoUsuario.rows[0] });
    }

    res.json({ tieneGrupo: false });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.unirseAGrupo = async (req, res) => {
  const { codigo_union } = req.body;
  const { id: usuario_id } = req.usuario;
  const ROL_MIEMBRO_REGULAR = 4;

  try {
    const grupo = await pool.query("SELECT grupo_id FROM grupos WHERE codigo_union = $1 AND estado = true", [codigo_union]);

    if (grupo.rows.length === 0) {
      return res.status(404).json({ msg: 'El código del grupo no es válido o el grupo no existe.' });
    }

    const grupo_id = grupo.rows[0].grupo_id;

    await pool.query(
      "INSERT INTO miembros_grupo (usuario_id, grupo_id, rol_id) VALUES ($1, $2, $3)",
      [usuario_id, grupo_id, ROL_MIEMBRO_REGULAR]
    );
    await pool.query("UPDATE usuarios SET grupo_activo_id = $1 WHERE usuario_id = $2", [grupo_id, usuario_id]);

    res.json({ msg: 'Te has unido al grupo exitosamente.' });

  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ msg: 'Ya eres miembro de este grupo.' });
    }
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};


exports.crearGrupo = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const { id: propietario_id } = req.usuario;
  const ROL_ADMINISTRADOR = 1;

  const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);
  const codigo_union = nanoid();

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const nuevoGrupo = await client.query(
      "INSERT INTO grupos (nombre, descripcion, propietario_id, codigo_union, usuario_ingreso) VALUES ($1, $2, $3, $4, $3) RETURNING grupo_id",
      [nombre, descripcion, propietario_id, codigo_union]
    );
    const grupo_id = nuevoGrupo.rows[0].grupo_id;

    await client.query(
      "INSERT INTO miembros_grupo (usuario_id, grupo_id, rol_id) VALUES ($1, $2, $3)",
      [propietario_id, grupo_id, ROL_ADMINISTRADOR]
    );
    await client.query("UPDATE usuarios SET grupo_activo_id = $1 WHERE usuario_id = $2", [grupo_id, propietario_id]);

    await client.query('COMMIT');

    res.status(201).json({ msg: 'Grupo creado exitosamente', grupo_id, codigo_union });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  } finally {
    client.release();
  }
};

exports.obtenerDatosInicio = async (req, res) => {
  try {
    const { id: usuario_id } = req.usuario;

    const query = `
      SELECT
        u.nombre_completo,
        u.email,
        g.nombre as nombre_grupo,
        g.codigo_union,
        mg.rol_id, 
        r.nombre_rol 
      FROM miembros_grupo as mg
      JOIN usuarios as u ON mg.usuario_id = u.usuario_id
      JOIN grupos as g ON mg.grupo_id = g.grupo_id
      JOIN roles as r ON mg.rol_id = r.rol_id 
      WHERE mg.usuario_id = $1 AND mg.estado = true
    `;

    const resultado = await pool.query(query, [usuario_id]);

    if (resultado.rows.length === 0) {

      const datosUsuario = await pool.query("SELECT nombre_completo, email FROM usuarios WHERE usuario_id = $1", [usuario_id]);
       if (datosUsuario.rows.length > 0) {
         return res.json(datosUsuario.rows[0]);
       }
      return res.status(404).json({ msg: 'No se encontraron datos para el usuario.' });
    }

    res.json(resultado.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};


exports.salirseDeGrupo = async (req, res) => {
  const { id: usuario_id } = req.usuario;

  try {
    const miembro = await pool.query(
      "SELECT grupo_id FROM miembros_grupo WHERE usuario_id = $1 AND estado = true",
      [usuario_id]
    );

    if (miembro.rows.length === 0) {
      return res.status(404).json({ msg: 'No perteneces a ningún grupo activo.' });
    }

    const grupo_id = miembro.rows[0].grupo_id;

    const grupo = await pool.query("SELECT propietario_id FROM grupos WHERE grupo_id = $1", [grupo_id]);
    if (grupo.rows[0].propietario_id === usuario_id) {
      return res.status(400).json({ msg: 'El propietario no puede salirse del grupo. Debes eliminarlo o transferir la propiedad.' });
    }

    await pool.query(
      "DELETE FROM miembros_grupo WHERE usuario_id = $1 AND grupo_id = $2",
      [usuario_id, grupo_id]
    );

    res.json({ msg: 'Has salido del grupo exitosamente.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};


exports.listarMisGrupos = async (req, res) => {
  const { id: usuario_id } = req.usuario;
  try {
    const query = `
      SELECT 
        g.grupo_id, 
        g.nombre,
        u.grupo_activo_id,
        r.nombre_rol
      FROM miembros_grupo mg
      JOIN grupos g ON mg.grupo_id = g.grupo_id
      JOIN roles r ON mg.rol_id = r.rol_id
      JOIN usuarios u ON mg.usuario_id = u.usuario_id
      WHERE mg.usuario_id = $1 AND mg.estado = true
    `;
    const misGrupos = await pool.query(query, [usuario_id]);
    res.json(misGrupos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};


exports.cambiarGrupoActivo = async (req, res) => {
  const { id: usuario_id } = req.usuario;
  const { grupo_id } = req.body;

  try {
    const esMiembro = await pool.query(
      "SELECT * FROM miembros_grupo WHERE usuario_id = $1 AND grupo_id = $2 AND estado = true",
      [usuario_id, grupo_id]
    );

    if (esMiembro.rows.length === 0) {
      return res.status(403).json({ msg: 'No eres miembro de este grupo.' });
    }

    await pool.query(
      "UPDATE usuarios SET grupo_activo_id = $1 WHERE usuario_id = $2",
      [grupo_id, usuario_id]
    );

    res.json({ msg: 'Grupo activo cambiado exitosamente.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};