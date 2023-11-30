const Notificacion = require('../models/notificaciones-m');

const notificacionesController = {
  crearNotificacion: async (req, res) => {
    const { contenido, destinatarioId } = req.body;

    try {
      const nuevaNotificacion = await Notificacion.create({ contenido, destinatarioId });
      res.status(201).json(nuevaNotificacion);
    } catch (error) {
      console.error('Error al crear notificación:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerNotificacionesUsuario: async (req, res) => {
    const destinatarioId = req.user.id;

    try {
      const notificaciones = await Notificacion.findAll({
        where: { destinatarioId },
        order: [['fechaCreacion', 'DESC']],
      });

      res.json(notificaciones);
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  marcarNotificacionLeida: async (req, res) => {
    const notificacionId = req.params.notificacionId;

    try {
      const notificacion = await Notificacion.findByPk(notificacionId);
      if (notificacion) {
        notificacion.leida = true;
        await notificacion.save();
        res.json(notificacion);
      } else {
        res.status(404).json({ error: 'Notificación no encontrada.' });
      }
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  eliminarNotificacion: async (req, res) => {
    const notificacionId = req.params.notificacionId;

    try {
      const notificacion = await Notificacion.findByPk(notificacionId);
      if (notificacion) {
        await notificacion.destroy();
        res.json({ mensaje: 'Notificación eliminada con éxito.' });
      } else {
        res.status(404).json({ error: 'Notificación no encontrada.' });
      }
    } catch (error) {
      console.error('Error al eliminar notificación:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },
};

module.exports = notificacionesController;