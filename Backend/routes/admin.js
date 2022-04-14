const express = require('express');
const adminParking = require('./parkingService/admin-parking');
const adminCar = require('./car/admin-car');

const router = express.Router();

router.use(adminParking);
router.use(adminCar);

module.exports = router;