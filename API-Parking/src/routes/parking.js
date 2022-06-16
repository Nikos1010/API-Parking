import {Router} from 'express';
import { getParkingSlots, postAddDetail, getParkingDetails, getParkingSlot, updateParkingSlot, deleteParkingSlot, getParkingDetail, updateParkingDetail, postAddEntryVehicle, getEntryVehicles, getEntryVehicle, updateEntryVehicle, updateOutputVehicle } from '../controllers/parking.js';

const router = Router();

router.post('/parking/detail/add-detail', postAddDetail);

router.get('/parking/details', getParkingDetails);

router.get('/parking/detail/:detailId', getParkingDetail);

router.put('/parking/detail/:detailId', updateParkingDetail);

router.get('/parking', getParkingSlots);

router.get('/parking/:parkingId', getParkingSlot);

router.put('/parking/:parkingId', updateParkingSlot);

router.delete('/parking/:parkingId', deleteParkingSlot);

router.post('/parking/vehicle-entry', postAddEntryVehicle);

router.get('/parking/vehicle-entry/all', getEntryVehicles);

router.get('/parking/vehicle-entry/:entryId', getEntryVehicle);

router.put('/parking/vehicle-entry/:entryId', updateEntryVehicle);

router.put('/parking/vehicle-output/:outputId', updateOutputVehicle);

export default router;