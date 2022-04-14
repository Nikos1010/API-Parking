const express = require('express');
const detailParking = require('./detail-parking/detail-parking');
const updateDetailParking = require('./detail-parking/update-detail');
const invoiceParking = require('./invoice/invoice');
const exitCar = require('./invoice/exit-car');

const router = express.Router();

router.use(detailParking.routes);
router.use(updateDetailParking);
router.use(invoiceParking);
router.use(exitCar);

module.exports = router;