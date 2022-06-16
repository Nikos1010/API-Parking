import Sequelize from 'sequelize';

import { sequelize } from '../database/db.js';

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

export default Invoice;