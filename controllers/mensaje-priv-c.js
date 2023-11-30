const MensajePrivado = require('../models/mensaje-priv-m');
const Usuario = require('../models/usuario-m')
const mensajesPrivadosController = {

  enviarMensajePrivado: async (req, res) => {
    const { contenido, destinatarioId } = req.body;
    const remitenteId = req.usuario.id;

    try {
      const nuevoMensaje = await MensajePrivado.create({ contenido, remitenteId, destinatarioId });
      res.status(201).json(nuevoMensaje);
    } catch (error) {
      console.error('Error al enviar mensaje privado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerMensajesPrivadosUsuario: async (req, res) => {
    const destinatarioId = req.usuario.id;

    try {
      const mensajes = await MensajePrivado.findAll({
        where: { destinatarioId },
        order: [['fechaEnvio', 'DESC']],
        include: [{ model: Usuario, as: 'Remitente' }],
      });

      res.json(mensajes);
    } catch (error) {
      console.error('Error al obtener mensajes privados:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  eliminarMensajePrivado: async (req, res) => {
    const mensajeId = req.params.mensajeId;

    try {
      const mensaje = await MensajePrivado.findByPk(mensajeId);
      if (mensaje) {
        await mensaje.destroy();
        res.json({ mensaje: 'Mensaje privado eliminado con éxito.' });
      } else {
        res.status(404).json({ error: 'Mensaje privado no encontrado.' });
      }
    } catch (error) {
      console.error('Error al eliminar mensaje privado:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },
};

module.exports = mensajesPrivadosController;