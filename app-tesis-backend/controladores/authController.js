// controllers/authController.js
const admin = require('firebase-admin');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const serviceAccount = require('../serviceAccountKey.json');
const bcrypt = require('bcryptjs');

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
    res.status(500).send('Error en el servidor');
  }
};

exports.registerUser = async (req, res) => {
  const { nombre_completo, email, contrasena } = req.body;

  try {
    const usuarioExistenteDB = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (usuarioExistenteDB.rows.length > 0) {
      return res.status(400).json({ msg: 'El correo electrónico ya está en uso.' });
    }

    const userRecord = await admin.auth().createUser({
      email: email,
      password: contrasena,
      displayName: nombre_completo,
    });
    
    const firebase_uid = userRecord.uid;
    const salt = await bcrypt.genSalt(10);
    const contrasena_hash = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = await pool.query(
      "INSERT INTO usuarios (firebase_uid, nombre_completo, email, contrasena_hash) VALUES ($1, $2, $3, $4) RETURNING usuario_id",
      [firebase_uid, nombre_completo, email, contrasena_hash]
    );

    const nuevoUsuarioId = nuevoUsuario.rows[0].usuario_id;
    
    await pool.query(
        "UPDATE usuarios SET usuario_ingreso = $1 WHERE usuario_id = $1",
        [nuevoUsuarioId]
    );

    res.status(201).json({ msg: 'Usuario registrado exitosamente.' });

  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ msg: 'El correo electrónico ya está registrado en Firebase.' });
    }
    res.status(500).send('Error en el servidor');
  }
};

exports.loginUser = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    let usuario = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (usuario.rows.length === 0) {
      return res.status(400).json({ msg: 'Credenciales no válidas.' });
    }

    const usuarioEncontrado = usuario.rows[0];

    if (!usuarioEncontrado.contrasena_hash) {
      return res.status(400).json({ msg: 'Este usuario debe iniciar sesión con Google.' });
    }

    const esCorrecta = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena_hash);
    if (!esCorrecta) {
      return res.status(400).json({ msg: 'Credenciales no válidas.' });
    }

    const payload = { usuario: { id: usuarioEncontrado.usuario_id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};