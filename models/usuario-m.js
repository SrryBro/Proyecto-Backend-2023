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

Usuario.login = async (email, password) => {
  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const contrasenaCorrecta = bcrypt.compareSync(password, usuario.password);

    if (contrasenaCorrecta) {
      const token = generarToken(usuario);
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