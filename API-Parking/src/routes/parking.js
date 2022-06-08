const express = require('express');
const parkingController = require('../controllers/parking');

const router = express.Router();

router.get('/parking', parkingController.getParkingSlots);

router.post('/add-detail', parkingController.postAddDetail);

router.get('/parking-detail', parkingController.getParkingDetail);

module.exports = router;