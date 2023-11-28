// models/usuario-m.js

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db');
const { generarToken } = require('../utilidades/token');

const Usuario = sequelize.define('Usuario', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (usuario) => {
      const saltRounds = 10;
      usuario.password = await bcrypt.hash(usuario.password, saltRounds);
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('password')) {
        const saltRounds = 10;
        usuario.password = await bcrypt.hash(usuario.password, saltRounds);
      }
    },
  },
});

module.exports = Usuario;