// controllers/usuariosController.js

const Usuario = require('../models/usuario-m');
const bcrypt = require('bcrypt');

const usuariosController = {

  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de usuarios.' });
    }
  },

  getUsuarioById: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
  },

  createUsuario:  async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
      // Verifica si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { email } });

      if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'Ya existe un usuario con este correo electrónico.' });
      }

      // Cifra la contraseña antes de crear el usuario
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Crea el usuario con la contraseña cifrada
      await Usuario.create({ username, email, role, password: hashedPassword });

      res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },


  updateUsuario: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        await usuario.update({ username, email, password });
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el usuario.' });
    }
  },

  deleteUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        await usuario.destroy();
        res.json({ message: 'Usuario eliminado con éxito.' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
  },

 
  loginUsuario: async (req, res) => {
    const { email, password } = req.body;
    try {
      console.log('Intento de inicio de sesión:', email, password);
      const { token, role } = await Usuario.login(email, password);
      console.log('Inicio de sesión exitoso:', email);
      res.json({ token, role });
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      res.status(401).json({ error: 'Autenticación fallida' });
    }
  },
};

module.exports = usuariosController;