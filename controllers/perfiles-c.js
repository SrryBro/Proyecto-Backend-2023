const Perfil = require('../models/perfil-m');
const Usuario = require('../models/usuario-m')

const perfilesController = {
  getAllPerfiles: async (req, res) => {
    try {
      const perfiles = await Perfil.findAll();
      res.json(perfiles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de perfiles.' });
    }
  },

  getPerfilById: async (req, res) => {
    const { id } = req.params;
    try {
      const perfil = await Perfil.findByPk(id);
      if (perfil) {
        res.json(perfil);
      } else {
        res.status(404).json({ error: 'Perfil no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el perfil.' });
    }
  },

  createPerfil: async (req, res) => {
    const { informacion, imagen } = req.body;

    try {
      // Verifica si el usuario ya tiene un perfil asociado
      const usuarioId = req.usuario.id; // Suponiendo que el usuario está autenticado
      const usuario = await Usuario.findByPk(usuarioId, { include: Perfil });

      if (usuario && usuario.Perfil) {
        return res.status(400).json({ mensaje: 'Este usuario ya tiene un perfil asociado.' });
      }

      const nuevoPerfil = await Perfil.create({ informacion, imagen});
      // Asocia el perfil al usuario correspondiente
      if (usuario) {
        await usuario.setPerfil(nuevoPerfil);
      } else {
        throw new Error('Usuario no encontrado al asociar el perfil.');
      }

      res.status(201).json(nuevoPerfil);
    } catch (error) {
      console.error('Error al crear perfil:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  updatePerfil: async (req, res) => {
    const { id } = req.params;
    const { informacion, imagen } = req.body;
    try {
      const perfil = await Perfil.findByPk(id);
      if (perfil) {
        await perfil.update({ informacion, imagen });
        res.json(perfil);
      } else {
        res.status(404).json({ error: 'Perfil no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el perfil.' });
    }
  },

  deletePerfil: async (req, res) => {
    const { id } = req.params;
    try {
      const perfil = await Perfil.findByPk(id);
      if (perfil) {
        await perfil.destroy();
        res.json({ mensaje: 'Perfil eliminado con éxito.' });
      } else {
        res.status(404).json({ error: 'Perfil no encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el perfil.' });
    }
  },
};

module.exports = perfilesController;