const jwt = require('jsonwebtoken');

// Middleware para validar el token JWT
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader); // Para depurar el token enviado
    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    const token = authHeader.split('Bearer ')[1]; // Formato esperado: "Bearer <token>"
    console.log('Token:', token); // Verifica que el token esté presente
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadir el email del usuario al request
        console.log('Decoded User:', req.user); // Verifica el contenido del token
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = { validateToken };