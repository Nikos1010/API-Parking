import Sequelize from 'sequelize';

import { sequelize } from '../database/db.js';

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

export default ParkingDetail;