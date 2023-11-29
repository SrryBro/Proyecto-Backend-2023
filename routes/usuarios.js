const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios-c');
const authorize = require('../middleware/auth'); // Asegúrate de ajustar la ruta según tu estructura de archivos
const verificarToken = require('../middleware/authMiddleware');

router.get('/' , verificarToken, authorize(['admin']), usuariosController.getAllUsuarios);
router.get('/:id', usuariosController.getUsuarioById);
router.post('/', usuariosController.createUsuario);
router.put('/:id', usuariosController.updateUsuario);
router.delete('/:id', usuariosController.deleteUsuario);
router.post('/login', usuariosController.loginUsuario);

module.exports = router;