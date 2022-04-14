const express = require('express');
const connection = require('../../../database/mysql');

const router = express.Router();

router.post('/add-car', (req, res) => {
    const sql = 'INSERT INTO car SET ?';

    const carObj = {
        plate: req.body.plate,
        id_type: req.body.id_type,
        id_color: req.body.id_color
    };

    connection.query(sql, carObj, error => {
        if(error) throw error;
        res.send('Car added');
    });
});

//En el formulario hacer un select(HTML) de los tipos y colores de carro

module.exports = router;