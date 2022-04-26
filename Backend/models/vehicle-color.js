const Sequelize = require('sequelize');

const sequelize = require('../database/db');

const VehicleColor = sequelize.define('vehicleColor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = VehicleColor;