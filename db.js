// db.js

const { Sequelize } = require('sequelize');
const { DB } = require('./config/config'); // Importa solo la configuración de la base de datos desde config.js

const sequelize = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  dialect: 'mysql',
});

module.exports = sequelize;