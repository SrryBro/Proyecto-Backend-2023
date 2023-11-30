const Publicacion = require('../models/publicacion-m');
const Usuario = require('../models/usuario-m')

const publicacionesController = {
  crearPublicacion: async (req, res) => {
    const { contenido } = req.body;
    const usuarioId = req.usuario.id;

    try {
      const nuevaPublicacion = await Publicacion.create({ contenido, usuarioId });
      res.status(201).json(nuevaPublicacion);
    } catch (error) {
      console.error('Error al crear publicación:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerPublicacionesUsuario: async (req, res) => {
    const usuarioId = req.params.id;
    console.log(usuarioId)
    try {
      const usuario = await Usuario.findByPk(usuarioId, {
        include: [{ model: Publicacion }],
      });

      if (usuario) {
        res.json(usuario.Publicacions);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
    } catch (error) {
      console.error('Error al obtener publicaciones de usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerTodasPublicaciones: async (req, res) => {
    try {
      const publicaciones = await Publicacion.findAll({
        order: [['fechaCreacion', 'DESC']],
      });

      res.json(publicaciones);
    } catch (error) {
      console.error('Error al obtener todas las publicaciones:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerPublicacionPorId: async (req, res) => {
    const publicacionId = req.params.publicacionId;

    try {
      const publicacion = await Publicacion.findByPk(publicacionId);
      if (publicacion) {
        res.json(publicacion);
      } else {
        res.status(404).json({ error: 'Publicación no encontrada.' });
      }
    } catch (error) {
      console.error('Error al obtener publicación por ID:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  actualizarPublicacion: async (req, res) => {
    const publicacionId = req.params.publicacionId;
    const { contenido } = req.body;

    try {
      const publicacion = await Publicacion.findByPk(publicacionId);
      if (publicacion) {
        publicacion.contenido = contenido;
        await publicacion.save();
        res.json(publicacion);
      } else {
        res.status(404).json({ error: 'Publicación no encontrada.' });
      }
    } catch (error) {
      console.error('Error al actualizar publicación:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  eliminarPublicacion: async (req, res) => {
    const publicacionId = req.params.publicacionId;

    try {
      const publicacion = await Publicacion.findByPk(publicacionId);
      if (publicacion) {
        await publicacion.destroy();
        res.json({ mensaje: 'Publicación eliminada con éxito.' });
      } else {
        res.status(404).json({ error: 'Publicación no encontrada.' });
      }
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },
};

module.exports = publicacionesController;