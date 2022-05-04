const express = require('express');
const invoiceController = require('../controllers/invoice');

const router = express.Router();

router.get('/invoice', invoiceController.getInvoices);

module.exports = router;