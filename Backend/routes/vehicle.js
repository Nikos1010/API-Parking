const express = require('express');

const vehicleController = require('../controllers/vehicle');

const router = express.Router();

router.get('/colors', vehicleController.getColors);

router.post('/add-color', vehicleController.postColor);

router.get('/types', vehicleController.getTypes);

router.post('/add-type', vehicleController.postType);

router.get('/vehicles', vehicleController.getVehicles);

router.get('/vehicles/:vehicleId', vehicleController.getVehicle);

router.post('/add-vehicle', vehicleController.postAddVehicle);

module.exports = router;