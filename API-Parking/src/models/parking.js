import Sequelize from 'sequelize';

import { sequelize } from '../database/db.js';

const Parking = sequelize.define('parking', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    disponibility: Sequelize.BOOLEAN
});

export default Parking;