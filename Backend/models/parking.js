const Sequelize = require('sequelize');

const sequelize = require('../database/db');

const Parking = sequelize.define('parking', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    disponibility: Sequelize.BOOLEAN
});

module.exports = Parking;