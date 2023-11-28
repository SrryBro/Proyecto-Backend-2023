// config/config.js

require('dotenv').config();

module.exports = {
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    DATABASE: process.env.DB_DATABASE || 'db',
  },

  SERVER: {
    PORT: process.env.PORT || 3000,
  },

  JWT: {
    SECRET: process.env.JWT_SECRET || 'Proyecto_2023',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '60h',
  },
};