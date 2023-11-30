const express = require('express');
const router = express.Router();
const mensajesPrivadosController = require('../controllers/mensaje-priv-c');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, mensajesPrivadosController.enviarMensajePrivado);
router.get('/', verificarToken, mensajesPrivadosController.obtenerMensajesPrivadosUsuario);
router.delete('/:mensajeId', verificarToken, mensajesPrivadosController.eliminarMensajePrivado);

module.exports = router;