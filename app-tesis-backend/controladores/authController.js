const admin = require('firebase-admin');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { name, email } = decodedToken;
    let usuario = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (usuario.rows.length === 0) {
      const primerInsert = await pool.query(
        "INSERT INTO usuarios (nombre_completo, email) VALUES ($1, $2) RETURNING usuario_id",
        [name, email]
      );
      const nuevoUsuarioId = primerInsert.rows[0].usuario_id;
      await pool.query(
        "UPDATE usuarios SET usuario_ingreso = $1 WHERE usuario_id = $1",
        [nuevoUsuarioId]
      );
      usuario = await pool.query("SELECT * FROM usuarios WHERE usuario_id = $1", [nuevoUsuarioId]);
    }

    const payload = { usuario: { id: usuario.rows[0].usuario_id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Error en googleLogin:', err); 
    res.status(500).send('Error en el servidor');
  }
};

exports.registerUser = async (req, res) => {
  const { nombre_completo, email, contrasena } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: contrasena,
      displayName: nombre_completo,
    });
    const firebase_uid = userRecord.uid;
    const nuevoUsuario = await pool.query(
      "INSERT INTO usuarios (firebase_uid, nombre_completo, email) VALUES ($1, $2, $3) RETURNING usuario_id",
      [firebase_uid, nombre_completo, email]
    );
    const nuevoUsuarioId = nuevoUsuario.rows[0].usuario_id;
    await pool.query(
        "UPDATE usuarios SET usuario_ingreso = $1 WHERE usuario_id = $1",
        [nuevoUsuarioId]
    );
    res.status(201).json({ msg: 'Usuario registrado exitosamente.' });
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ msg: 'El correo electrónico ya está registrado.' });
    }
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};


exports.loginUser = async (req, res) => {
  const { idToken } = req.body; 
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email } = decodedToken;
    const usuario = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (usuario.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuario no encontrado en la base de datos.' });
    }
    const payload = { usuario: { id: usuario.rows[0].usuario_id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Error en loginUser:', err);
    res.status(401).send('Token no válido o expirado.');
  }
};