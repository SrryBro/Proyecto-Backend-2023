const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Perfil = sequelize.define('Perfil', {
  informacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});



module.exports = Perfil;