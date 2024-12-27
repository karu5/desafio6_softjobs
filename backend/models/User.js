const pool = require('../db.js');
const format = require('pg-format');

// Obtener usuario por email
const getUserByEmail = async (email) => {
    const query = format("SELECT * FROM usuarios WHERE email = %L", email);
    const result = await pool.query(query);
    console.log(result.rows[0]);
    return result.rows[0];
};

// Crear un nuevo usuario
const createUserInDB = async (email, password, rol = 'user', lenguage = 'undefined') => {
    const result = await pool.query(
        'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
        [email, password, rol, lenguage]
    );
    return result.rows[0];
};


module.exports = { getUserByEmail, createUserInDB };