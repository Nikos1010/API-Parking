const express = require('express');
const addType = require('./detailCar/add-type');
const addColor = require('./detailCar/add-color');
const addCar = require('./carCRUD/add-car');
const allCars = require('./carCRUD/cars');
const updateCar = require('./carCRUD/update-car');

const router = express.Router();

router.use(addColor);
router.use(addType);
router.use(addCar);
router.use(allCars);
router.use(updateCar);

module.exports = router;