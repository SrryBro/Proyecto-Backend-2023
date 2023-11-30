const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentarios-c');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, comentariosController.crearComentario);
router.get('/publicacion/:publicacionId', verificarToken, comentariosController.obtenerComentariosPublicacion);
router.get('/usuario/:usuarioId', verificarToken, comentariosController.obtenerComentariosPublicacion);
router.delete('/:comentarioId', verificarToken, comentariosController.eliminarComentario);

module.exports = router;