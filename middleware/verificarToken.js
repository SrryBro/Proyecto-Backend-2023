const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

function verificarToken(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, CONFIG.JWT.SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token no válido.' });
  }
};

module.exports = verificarToken;