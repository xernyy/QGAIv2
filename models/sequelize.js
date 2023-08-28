const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../sageDb/sage.db', // Change this to your desired database file path
});

module.exports = sequelize;

