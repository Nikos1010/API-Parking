const express = require('express');

const vehicleController = require('../controllers/vehicle');

const router = express.Router();

router.get('/vehicle/colors', vehicleController.getColors);

router.post('/vehicle/add-color', vehicleController.postColor);

router.get('/vehicle/types', vehicleController.getTypes);

router.post('/vehicle/add-type', vehicleController.postType);

router.get('/vehicle', vehicleController.getVehicles);

router.get('/vehicle/:vehicleId', vehicleController.getVehicle);

router.post('/add-vehicle', vehicleController.postAddVehicle);

module.exports = router;