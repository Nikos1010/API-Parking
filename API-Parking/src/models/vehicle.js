import Sequelize from 'sequelize';

import {sequelize} from '../database/db.js';
// const sequelize = sequelize.sequelize;

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
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

export default Vehicle;