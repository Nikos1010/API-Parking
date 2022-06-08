import {Router} from'express';

import { getColors, postColor, getTypes, postType, getVehicles, getVehicle, postAddVehicle, deleteVehicle } from '../controllers/vehicle.js';

const router = Router();

router.get('/vehicle/colors', getColors);

router.post('/vehicle/add-color', postColor);

router.get('/vehicle/types', getTypes);

router.post('/vehicle/add-type', postType);

router.get('/vehicle', getVehicles);

router.get('/vehicle/:vehicleId', getVehicle);

router.delete('/vehicle/:vehicleId', deleteVehicle);

router.post('/vehicle/add-vehicle', postAddVehicle);

export default router;