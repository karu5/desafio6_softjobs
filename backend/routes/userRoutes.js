const express = require('express');
const { createUser, getUsers} = require('../controllers/userController.js');
const { validateToken } = require('../middlewares/authMiddleware.js');


const router = express.Router();

// Ruta para crear un usuario
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', validateToken, getUsers);

module.exports = router;