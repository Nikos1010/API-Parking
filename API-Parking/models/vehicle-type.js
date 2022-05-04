const Sequelize = require('sequelize');

const sequelize = require('../database/db').sequelize;

const VehicleType = sequelize.define('vehicleType', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    typeCar: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = VehicleType;