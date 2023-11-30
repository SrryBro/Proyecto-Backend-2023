const Amistad = require('../models/amistad-m');

const amistadesController = {
  iniciarAmistad: async (req, res) => {
    const { usuario2Id } = req.body;
    const usuario1Id = req.user.id;

    try {
      const nuevaAmistad = await Amistad.create({ usuario1Id, usuario2Id });
      res.status(201).json(nuevaAmistad);
    } catch (error) {
      console.error('Error al iniciar amistad:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  obtenerAmistadesUsuario: async (req, res) => {
    const usuarioId = req.params.usuarioId;

    try {
      const amistades = await Amistad.findAll({
        where: {
          [sequelize.Op.or]: [
            { usuario1Id: usuarioId },
            { usuario2Id: usuarioId },
          ],
        },
        include: [
          { model: Usuario, as: 'Usuario1' },
          { model: Usuario, as: 'Usuario2' },
        ],
      });

      res.json(amistades);
    } catch (error) {
      console.error('Error al obtener amistades del usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },

  eliminarAmistad: async (req, res) => {
    const amistadId = req.params.amistadId;

    try {
      const amistad = await Amistad.findByPk(amistadId);
      if (amistad) {
        await amistad.destroy();
        res.json({ mensaje: 'Amistad eliminada con éxito.' });
      } else {
        res.status(404).json({ error: 'Amistad no encontrada.' });
      }
    } catch (error) {
      console.error('Error al eliminar amistad:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  },
};

module.exports = amistadesController;