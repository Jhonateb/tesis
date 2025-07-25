const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables de entorno

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(config);
module.exports = pool;