import Sequelize from 'sequelize';

import { sequelize } from '../database/db.js';

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

export default VehicleColor;