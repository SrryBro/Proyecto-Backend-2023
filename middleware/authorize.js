const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config'); // Ajusta la ruta según tu estructura de archivos

const authorize = (roles) => {
    return (req, res, next) => {
      const usuario = req.usuario;
  
      // Verificar si el usuario tiene el rol necesario
      if (roles.includes(usuario.role)) {
        next(); // El usuario tiene el rol necesario, permite el acceso
      } else {
        res.status(403).json({ mensaje: 'Acceso denegado.' });
      }
    };
  };

  module.exports = authorize;