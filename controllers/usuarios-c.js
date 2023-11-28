// controllers/usuariosController.js

const Usuario = require('../models/usuario-m');

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

  createUsuario: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const nuevoUsuario = await Usuario.create({ username, email, password });
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el usuario.' });
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
};

module.exports = usuariosController;