require('dotenv').config(); // Cargar configuraciones del archivo .env
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors'); // Permitir solicitudes desde otros orígenes

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON
app.use(morgan('dev')); // Log de solicitudes

// Rutas
app.use('/login', authRoutes);   // Ruta para autenticación
app.use('/usuarios', userRoutes); // Ruta para usuarios CRUD


// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});