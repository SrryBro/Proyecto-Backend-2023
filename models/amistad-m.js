const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuario-m');

const Amistad = sequelize.define('Amistad', {
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Amistad.belongsTo(Usuario, { as: 'Usuario1', foreignKey: 'usuario1Id' });
Amistad.belongsTo(Usuario, { as: 'Usuario2', foreignKey: 'usuario2Id' });

module.exports = Amistad;