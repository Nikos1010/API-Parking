const Sequelize = require('sequelize');

const sequelize = require('../database/db').sequelize;

const Vehicle = sequelize.define('vehicle', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    plate: {
        type: Sequelize.STRING(8),
        allowNull: false
    }
});

module.exports = Vehicle;