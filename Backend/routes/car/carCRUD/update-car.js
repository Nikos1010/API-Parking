const express = require('express');
const connection = require('../../../database/db');
//Tiene problemas, no se que pasa

const router = express.Router();

router.put('/cars/:id', (req, res) => {
    const {id} = req.params;
    const {plate, id_type, id_color} = req.body;
    const sql = `UPDATE car SET plate = '${plate}',
    id_type = ${id_type}, id_color = ${id_color} 
    WHERE id_car = ${id}`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Modified info Car');
    });
});

module.exports = router;