const express = require('express');
const connection = require('../../../database/mysql');
const detailParking = require('../detail-parking/detail-parking');

const router = express.Router();

router.post('/add-invoice', (req, res) => {
    const sql = 'INSERT INTO invoice SET ?';
    
    const invoiceObj = {
        id_car: req.body.id_car,
        id_slot: req.body.id_slot,
        entrance: req.body.entrance
    };

    connection.query(sql, invoiceObj, error => {
        if(error) throw error;
        res.send('Invoice added');
    });
    const sqlParking = `UPDATE parking_lot 
    SET disponibility = false WHERE id_slot = ${invoiceObj.id_slot}`;
    connection.query(sqlParking, error => {
        if(error) throw error;
    });
    // const infoSlot = detailParking.infoSlots;

    // if (invoiceObj.id_slot <= infoSlot.number_slots) {
    //     let validation = true;
    //     // const sqlSlots = `SELECT disponibility FROM parking_lot WHERE id_slot= ${invoiceObj.id_slot}`;
    //     // connection.query(sqlSlots, (error, results) => {
    //     //     if(error) throw error;
    //     //     if(results.length > 0) {
    //     //         if (results[0].disponibility == false) {
    //     //             validation = false;
    //     //         }
    //     //     }
    //     // });
    //     if(validation) {
    //     }
    // }
});

module.exports = router;