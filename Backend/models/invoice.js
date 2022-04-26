const Sequelize = require('sequelize');

const sequelize = require('../database/db');

const Invoice = sequelize.define('invoice', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    entrance: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    departure: Sequelize.DATE
});

module.exports = Invoice;