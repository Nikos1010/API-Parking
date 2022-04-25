const express = require('express');
const connection = require('../../../database/db');

const router = express.Router();

router.post('/add-type', (req, res) => {
    const sql = 'INSERT INTO car_type SET ?';

    const typeObj = { car_type: req.body.car_type };

    connection.query(sql, typeObj, error => {
        if(error) throw error;
        res.send('Type of car added');
    });
});

module.exports = router;