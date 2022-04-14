const express = require('express');
const connection = require('../../../database/mysql');
const calculatedHours = require('../../../functions/calculated-hours')

const router = express.Router();

let idExit = 0;
router.post('/exit/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'INSERT INTO invoice_detail SET ?';

    const invoiceDetailObj = {
        departure: req.body.departure,
        id_invoice: id
    };
    idExit = invoiceDetailObj.id_invoice; 

    connection.query(sql, invoiceDetailObj, error => {
        if(error) throw error;
        res.redirect('Exit from parking');
    });
});

router.get('/price', (req, res) => {
    const sql = `SELECT TIMESTAMPDIFF(HOUR, entrance, departure) as Horas
    FROM invoice INNER JOIN invoice_detail ON invoice_detail.id_invoice = invoice.id_invoice
    WHERE invoice.id_invoice = ${idExit}`;
    let total;
    const calcHours = calculatedHours.calculatedHours;

    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.lenght > 0) {
            total = calcHours(results[0].Horas);
        }
    });

    const sqlPrice = 'SELECT price_hour FROM detail_lot WHERE id_lot = 1';
    connection.query(sqlPrice, (error, results) => {
        if (error) throw error;
        if (results.lenght > 0) {
            total *= results[0].price_hour;
            res.send(`Total a pagar: ${total}`);
        }
    });
});

module.exports = router;