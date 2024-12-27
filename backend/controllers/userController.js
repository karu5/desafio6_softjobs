const { createUserInDB, getUserByEmail } = require('../models/User.js');
const bcrypt = require('bcryptjs');


// Crear un nuevo usuario
const createUser = async (req, res, next) => {
    try {
        const { email, password, rol, lenguage } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUserInDB(email, hashedPassword, rol, lenguage);

        res.status(201).json({ message: 'Usuario creado', user: newUser });
    } catch (error) {
        next(error);
    }
};


const getUsers = async (req, res) => {
    try {
        const email = req.user.email;
        console.log(email);

        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({ message: 'Ocurrio un error al obtener el usuario' });
    }
};

module.exports = { createUser, getUsers};