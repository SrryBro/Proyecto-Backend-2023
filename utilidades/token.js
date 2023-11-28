const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const Usuario = require('../models/usuario-m');

// Función para generar un token JWT
const generarToken = (Usuario) => {
  const payload = {
    id: Usuario.id,
    username: Usuario.username,
    role: Usuario.role,
  };

  const options = {
    expiresIn: CONFIG.JWT.EXPIRES_IN,
  };

  const token = jwt.sign(payload, CONFIG.JWT.SECRET, options);
  return token;
};

