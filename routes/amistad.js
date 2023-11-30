const express = require('express');
const router = express.Router();
const amistadesController = require('../controllers/amistad-c');
const verificarToken = require('../middleware/authMiddleware');

router.post('/', verificarToken, amistadesController.iniciarAmistad);
router.get('/:usuarioId', verificarToken, amistadesController.obtenerAmistadesUsuario);
router.delete('/:amistadId', verificarToken, amistadesController.eliminarAmistad);

module.exports = router;