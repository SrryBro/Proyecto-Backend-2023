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
    console.log(usuario)
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const contraseñaCorrecta = bcrypt.compareSync(password,usuario.password)
    console.log('Contraseña almacenada:', usuario.password);
    console.log('Contraseña ingresada:', password);
    console.log(contraseñaCorrecta)

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
}

module.exports = Usuario;