const express = require('express');
const { loginUser } = require('../controllers/authController.js');
const router = express.Router();

// Ruta POST para iniciar sesión
router.post('/', loginUser);

module.exports = router;