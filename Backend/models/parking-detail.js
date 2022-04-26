const Sequelize = require('sequelize');

const sequelize = require('../database/db');

const ParkingDetail = sequelize.define('parkingDetail', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    priceHour: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    priceDay: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    numberSlots: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = ParkingDetail;