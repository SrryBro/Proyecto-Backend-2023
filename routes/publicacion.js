const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicacion-c');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, publicacionesController.crearPublicacion);
router.get('/usuario/:usuarioId', verificarToken, publicacionesController.obtenerPublicacionesUsuario);
router.get('/', verificarToken, publicacionesController.obtenerTodasPublicaciones);
router.get('/:publicacionId', verificarToken, publicacionesController.obtenerPublicacionPorId);
router.put('/:publicacionId', verificarToken, publicacionesController.actualizarPublicacion);
router.delete('/:publicacionId', verificarToken, publicacionesController.eliminarPublicacion);

module.exports = router;