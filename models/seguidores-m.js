const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./usuario-m');

const Seguidor = sequelize.define('Seguidor', {
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Seguidor.belongsTo(Usuario, { foreignKey: 'seguidorId', as: 'Seguidor' });
Seguidor.belongsTo(Usuario, { foreignKey: 'seguidoId', as: 'Seguido' });

module.exports = Seguidor;