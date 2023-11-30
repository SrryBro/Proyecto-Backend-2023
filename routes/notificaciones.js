const express = require('express');
const router = express.Router();
const notificacionesController = require('../controllers/publicacion-c');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, notificacionesController.crearNotificacion);
router.get('/', verificarToken, notificacionesController.obtenerNotificacionesUsuario);
router.put('/:notificacionId/leer', verificarToken, notificacionesController.marcarNotificacionLeida);
router.delete('/:notificacionId', verificarToken, notificacionesController.eliminarNotificacion);

module.exports = router;