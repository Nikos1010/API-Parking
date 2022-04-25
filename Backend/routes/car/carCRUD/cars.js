const express = require('express');
const connection = require('../../../database/db');

const router = express.Router();

router.get('/cars', (req, res) => {
    const sql = 'SELECT * FROM car';

    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        } else {
            res.send('Not result');
        }
    })
});

router.get('/cars/:id', (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM car WHERE id_car = ${id}`;

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send('Not result');
        }
    })
});

module.exports = router;