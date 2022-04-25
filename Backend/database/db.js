const Sequelize = require('sequelize');
const { db } = require('../config/default');


const sequelize = new Sequelize(db);

module.exports = sequelize;