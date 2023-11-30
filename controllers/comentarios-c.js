// controllers/comentarios-c.js
const Comentario = require('../models/comentarios-m');
const Publicacion = require('../models/publicacion-m');
const Usuario = require('../models/usuario-m');
// ...

const comentariosController = {

  crearComentario: async (req, res) => {
    const { texto, publicacionId } = req.body;
    const usuarioId = req.usuario.id;
    console.log(usuarioId)
    try {
      const nuevoComentario = await Comentario.create({ texto, usuarioId, publicacionId });
      res.status(201).json(nuevoComentario);
    } catch (error) {
      console.error('Error al crear comentario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerComentariosPublicacion: async (req, res) => {
    const publicacionId = req.params.publicacionId;

    try {
      const comentarios = await Comentario.findAll({
        where: { publicacionId },
        order: [['fechaCreacion', 'DESC']],
        include: [{ model: Usuario }],
      });

      res.json(comentarios);
    } catch (error) {
      console.error('Error al obtener comentarios de publicación:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  eliminarComentario: async (req, res) => {
    const comentarioId = req.params.comentarioId;

    try {
      const comentario = await Comentario.findByPk(comentarioId);
      if (comentario) {
        await comentario.destroy();
        res.json({ mensaje: 'Comentario eliminado con éxito.' });
      } else {
        res.status(404).json({ error: 'Comentario no encontrado.' });
      }
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerComentariosUsuario: async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
      const comentarios = await Comentario.findAll({
        where: { usuarioId },
        order: [['fechaCreacion', 'DESC']],
        include: [{ model: Publicacion }],
      });

      res.json(comentarios);
    } catch (error) {
      console.error('Error al obtener comentarios de usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },
};

module.exports = comentariosController;