const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Seguidor = sequelize.define('Seguidor', {
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Seguidor;