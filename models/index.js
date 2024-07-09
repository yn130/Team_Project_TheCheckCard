const { Sequelize } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
const User = require('./User');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
    sequelize,
    Sequelize,
    User: User(sequelize, Sequelize)
};

module.exports = db;
