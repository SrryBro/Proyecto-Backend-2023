const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Comentario = sequelize.define('Comentario', {
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Comentario;