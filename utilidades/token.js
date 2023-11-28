const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');


// Función para generar un token JWT
const generarToken = (Usuario) => {
  try {
    const payload = {
      id: Usuario.id,
      username: Usuario.username,
      role: Usuario.role,
    };

    const options = {
      expiresIn: CONFIG.JWT.EXPIRES_IN,
    };

    const token = jwt.sign(payload, CONFIG.JWT.SECRET, options);
    console.log('Token generado con éxito:', token);
    return token;
  } catch (error) {
    console.error('Error al generar el token:', error);
    throw error;
  }
};

module.exports =  generarToken;