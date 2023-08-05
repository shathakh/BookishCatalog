const { DataTypes }= require('sequelize');
const sequelize = require('../db/config/connection');

const Book = sequelize.define('book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageLink: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports =Book;
