const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuario-m');

const Notificacion = sequelize.define('Notificacion', {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Notificacion.belongsTo(Usuario, { as: 'Destinatario' });

module.exports = Notificacion;