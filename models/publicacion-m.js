const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuario-m');

const Publicacion = sequelize.define('Publicacion', {
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

Publicacion.belongsTo(Usuario);

module.exports = Publicacion;