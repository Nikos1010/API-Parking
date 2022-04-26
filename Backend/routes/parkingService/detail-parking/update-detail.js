const express = require('express');
const connection = require('../../../database/db');

const router = express.Router();

router.put('/parking-update/:id', (req, res) => {
    const {id} = req.params;
    const { price_hour, price_day, number_slots } = req.body;
    const sql = `UPDATE detail_lot 
    SET price_hour = '${price_hour}', price_day = ${price_day}, 
    number_slots = ${number_slots} WHERE id_lot = ${id}`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Modified detail lot');
    });

    // const numberAllSlots = 'SELECT count(id_slot) FROM parking_lot';
    // const total = number_slots - numberAllSlots;
    // if (number_slots > numberAllSlots) {
    //     const sql = 'INSERT INTO parking_lot SET ?';
    //     const detailParkingObj = { disponibility: true, id_lot: 1 };
    //     for (let i = 1; i <= total; i++) {
    //         connection.query(sql, detailParkingObj, error => {
    //             if (error) throw error;
    //         });
    //     };
    // } else if(number_slots < numberAllSlots) {
    //     const sql = `UPDATE parking_lot 
    //     SET disponibility = false WHERE id_lot = `;
    //     for (let i = 1; i <= total; i++) {
    //         connection.query(sql, detailParkingObj, error => {
    //             if (error) throw error;
    //         });
    //     };

    // }
});

module.exports = router;