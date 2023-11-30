const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuario-m');

const MensajePrivado = sequelize.define('MensajePrivado', {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fechaEnvio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

MensajePrivado.belongsTo(Usuario, { as: 'Remitente' });
MensajePrivado.belongsTo(Usuario, { as: 'Destinatario' });

module.exports = MensajePrivado;