const Sequelize = require('sequelize');
const { db } = require('../config/default');


const sequelize = new Sequelize('parking', 'root', 'Noithyung15-25%', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;