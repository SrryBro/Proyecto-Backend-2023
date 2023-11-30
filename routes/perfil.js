const express = require('express');
const router = express.Router();
const perfilesController = require('../controllers/perfiles-c');
const authorize = require('../middleware/auth'); // Asegúrate de ajustar la ruta según tu estructura de archivos
const verificarToken = require('../middleware/authMiddleware');

router.get('/', verificarToken, authorize(['admin']), perfilesController.getAllPerfiles);
router.get('/:id', perfilesController.getPerfilById);
router.post('/', verificarToken,perfilesController.createPerfil);
router.put('/:id', perfilesController.updatePerfil);
router.delete('/:id', perfilesController.deletePerfil);

module.exports = router;