const express = require('express');
const router = express.Router();
const seguidoresController = require('../controllers/seguidores-c');
const verificarToken = require('../middleware/authMiddleware');

router.post('/seguir/:usuarioId', verificarToken, seguidoresController.seguirUsuario);
router.delete('/dejar-de-seguir/:usuarioId', verificarToken, seguidoresController.dejarDeSeguirUsuario);
router.get('/:usuarioId', verificarToken, seguidoresController.obtenerSeguidores);
router.get('/seguidos/:usuarioId', verificarToken, seguidoresController.obtenerSeguidos);

module.exports = router;