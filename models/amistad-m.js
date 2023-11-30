// models/amistad-m.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const Amistad = sequelize.define('Amistad', {
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Amistad;