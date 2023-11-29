const authorize = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.usuario.role; // Suponiendo que la información del usuario está en req.usuario
  
      if (allowedRoles.includes(userRole)) {
        // El usuario tiene el rol permitido, permitir el acceso
        next();
      } else {
        // Acceso denegado
        res.status(403).json({ mensaje: 'Acceso denegado. No tienes permisos suficientes.' });
      }
    };
  };
  
  module.exports = authorize;