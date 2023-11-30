const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuario-m');
const Publicacion = require('./publicacion-m');

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

Comentario.belongsTo(Usuario);
Comentario.belongsTo(Publicacion);

module.exports = Comentario;