const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config'); // Ajusta la ruta según tu estructura de archivos

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.header('Authorization');

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const usuario = jwt.verify(token, CONFIG.JWT_SECRET);

    // Adjuntar la información del usuario al objeto de solicitud
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado. Token no válido.' });
  }
};

module.exports = authMiddleware;