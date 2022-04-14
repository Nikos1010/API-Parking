const express = require('express');
const connection = require('../../../database/mysql');

const router = express.Router();

router.post('/add-color', (req, res) => {
    const sql = 'INSERT INTO color SET ?';

    const colorObj = { color: req.body.color};

    connection.query(sql, colorObj, error => {
        if(error) throw error;
        res.send('Color of car added');
    });
});

module.exports = router;