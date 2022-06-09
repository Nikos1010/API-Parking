import {Router} from'express';

import { getColors, getColor, updateColor, postColor, getTypes, postType, getVehicles, getVehicle, postAddVehicle, deleteVehicle, updateVehicle, deleteColor, getType, updateType } from '../controllers/vehicle.js';

const router = Router();

router.get('/vehicle/colors', getColors);

router.get('/vehicle/color/:colorId', getColor);

router.put('/vehicle/color/:colorId', updateColor);

router.delete('/vehicle/color/:colorId', deleteColor);

router.post('/vehicle/add-color', postColor);

router.get('/vehicle/types', getTypes);

router.get('/vehicle/type/:typeId', getType);

router.put('/vehicle/type/:typeId', updateType);

router.post('/vehicle/add-type', postType);

router.get('/vehicle', getVehicles);

router.get('/vehicle/:vehicleId', getVehicle);

router.put('/vehicle/:vehicleId', updateVehicle);

router.delete('/vehicle/:vehicleId', deleteVehicle);

router.post('/vehicle/add-vehicle', postAddVehicle);

export default router;