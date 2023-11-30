const Seguidor = require('../models/seguidores-m');
const Usuario = require('../models/usuario-m')

const seguidoresController = {
  seguirUsuario: async (req, res) => {
    const seguidoId = req.params.usuarioId;
    const seguidorId = req.usuario.id;

    try {
      const nuevaRelacion = await Seguidor.create({ seguidoId, seguidorId });
      res.status(201).json(nuevaRelacion);
    } catch (error) {
      console.error('Error al seguir usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  dejarDeSeguirUsuario: async (req, res) => {
    const seguidoId = req.params.usuarioId;
    const seguidorId = req.usuario.id;

    try {
      const relacion = await Seguidor.findOne({ where: { seguidoId, seguidorId } });
      if (relacion) {
        await relacion.destroy();
        res.json({ mensaje: 'Dejaste de seguir al usuario.' });
      } else {
        res.status(404).json({ error: 'No se encontró la relación de seguimiento.' });
      }
    } catch (error) {
      console.error('Error al dejar de seguir usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerSeguidores: async (req, res) => {
    const usuarioId = req.params.usuarioId;

    try {
      const seguidores = await Seguidor.findAll({
        where: { seguidoId: usuarioId },
        include: [{ model: Usuario, as: 'Seguidor' }],
      });

      res.json(seguidores);
    } catch (error) {
      console.error('Error al obtener seguidores:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerSeguidos: async (req, res) => {
    const usuarioId = req.params.usuarioId;

    try {
      const seguidos = await Seguidor.findAll({
        where: { seguidorId: usuarioId },
        include: [{ model: Usuario, as: 'Seguido' }],
      });

      res.json(seguidos);
    } catch (error) {
      console.error('Error al obtener seguidos:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },
};

module.exports = seguidoresController;