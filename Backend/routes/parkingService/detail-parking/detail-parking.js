const express = require('express');
const connection = require('../../../database/db');

const router = express.Router();

const info = [];

router.post('/add-detail', (req, res) => {
    const sql = 'INSERT INTO detail_lot SET ?';

    const detailLotObj = {
        price_hour: req.body.price_hour,
        price_day: req.body.price_day,
        number_slots: req.body.number_slots
    };
    info.push(detailLotObj);

    connection.query(sql, detailLotObj, error => {
        if(error) throw error;
        res.send('Detail of parking added');   
    });
    
    const sqlParking = 'INSERT INTO parking_lot SET ?';
    const detailParkingObj = { disponibility: true, id_lot: 1};
    for( let i = 1; i <= detailLotObj.number_slots; i++ ) {
        connection.query(sqlParking, detailParkingObj, error => {
            if(error) throw error;
        });
    };
});

exports.routes = router;
exports.infoSlots = info;