const { DataTypes } = require('sequelize');
const sequelize = require('../db');


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

module.exports = MensajePrivado;