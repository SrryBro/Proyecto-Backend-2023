// models/usuario-m.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../db');
require('dotenv').config();

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
});

Usuario.login = async (email, password) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const contraseñaCorrecta = bcrypt.compareSync(password, usuario.password);

    if (contraseñaCorrecta) {
      const token = jwt.sign(
        { id: usuario.id, username: usuario.username, role: usuario.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      return { token, role: usuario.role };
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error de autenticación en Usuario.login:', error);
    throw error;
  }
};



Usuario.hasOne(Perfil);
module.exports = Usuario;