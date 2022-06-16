import Parking from '../models/parking.js';
import ParkingDetail from '../models/parking-detail.js';

import { NotFound } from './exception/notFoundException.js';
import { attributesGet } from '../services/attributeSequelize.js';
import { updateModel } from '../services/updateModel.js';
import Vehicle from '../models/vehicle.js';
import InvoiceSQL from '../models/invoiceSQL.js';
import { calculatedHours } from '../services/calculated-hours.js';

export const getParkingSlots = (req, res) => {
    Parking.findAll(attributesGet(['id', 'disponibility']))
        .then(slots => {
            NotFound(slots, res, 'Parking Slots Not Found');
        })
        .catch(err => console.log(err));
}

export const getParkingSlot = (req, res) => {
    const parkingId = req.params.parkingId;
    Parking.findAll(attributesGet(['id', 'disponibility'], parkingId))
        .then(slot => {
            NotFound(slot, res, 'Parking Slot Not Found');
        })
        .catch(err => console.log(err));
}

export const updateParkingSlot = async (req, res) => {
    const parkingId = req.params.parkingId;
    const { disponibility } = req.body;
    const existId = await Parking.findByPk(parkingId);
    if(existId) {
        updateModel(Parking, { disponibility: disponibility }, res, { id: parkingId }, 'Parking Slot');
    } else {
        NotFound([], res, 'Parking Slot Not Found');
    }
}

export const deleteParkingSlot = async (req, res) => {
    const parkingId = req.params.parkingId;
    const existId = await Parking.findByPk(parkingId);
    if(existId) {
        await Parking.destroy({ where: {id: parkingId } });
    } else {
        NotFound([], res, "Parking Slot Not Found");
    }
}

export const postAddDetail = async (req, res) => {
    const exists = await ParkingDetail.findByPk(1);
    if(!exists){
        const { priceHour, priceDay, numberSlots } = req.body;
        ParkingDetail.create({
            priceHour: priceHour,
            priceDay: priceDay,
            numberSlots: numberSlots
        })
        .then(result => {
                for (let i = 1; i <= numberSlots; i++) {
                    Parking.create({
                        disponibility: true,
                        parkingDetailId: 1
                    })
                        .catch(err => console.log(err));
                }
                res.json({ msg: 'Detail and Slots of Parking Added' });
            })
        .catch(err => console.log(err));
    } else {
        NotFound([], res, "No more posts accepted")
    }
}

export const getParkingDetails = (req, res) => {
    ParkingDetail.findAll(attributesGet(['id', 'priceHour', 'priceDay', 'numberSlots']))
        .then(details => {
            NotFound(details, res, 'Parking Detail not found');
        })
        .catch(err => console.log(err));
}

export const getParkingDetail = (req, res) => {
    const detailId = req.params.detailId;
    ParkingDetail.findAll(attributesGet(['id', 'priceHour', 'priceDay', 'numberSlots'], detailId))
        .then(detail => {
            NotFound(detail, res, 'Parking Detail not found');
        })
        .catch(err => console.log(err));
}

export const updateParkingDetail = async (req, res) => {
    const detailId = req.params.detailId;
    const {id, numberSlots} = await ParkingDetail.findByPk(detailId);
    const numberSlotsOld = numberSlots;
    const numberSlotsAll = await Parking.max('id');
    console.log(numberSlotsAll);
    if (id) {
        const { priceHour, priceDay, numberSlots } = req.body;
        if(numberSlotsOld < numberSlots){
            for (let i = numberSlotsOld; i <= numberSlots; i++) {
                if(i <= numberSlotsAll){
                    console.log('slots antiguos son menores a los nuevos');
                    Parking.update({ disponibility: true }, { where: { id: i } })
                        .catch(err => console.log(err));
                } else {
                    Parking.create({
                        disponibility: true,
                        parkingDetailId: 1
                    })
                        .catch(err => console.log(err));
                }
            }
        } else if(numberSlotsOld > numberSlots) {
            console.log('slots antiguos son mayores a los nuevos');
            for (let i = numberSlots+1; i <= numberSlotsAll; i++) {
                Parking.update({ disponibility: false }, { where: { id: i } })
                    .catch(err => console.log(err));
            }
        }
        updateModel(ParkingDetail, { priceHour: priceHour, priceDay: priceDay, numberSlots: numberSlots }, res, { id: detailId }, 'Parking Detail');
    } else {
        NotFound([], res, 'Parking Detail not found');
    }
}

export const postAddEntryVehicle = async (req, res) => {
    const { parkingId, vehicleId } = req.body;
    const { disponibility } = await Parking.findByPk(parkingId);
    const existId = await Vehicle.findByPk(vehicleId);
    if(disponibility && existId){
        InvoiceSQL.create({
            parkingId: parkingId,
            vehicleId: vehicleId,
            entrance: new Date()
        })
            .then(result => {
                Parking.update({ disponibility: false }, { where: { id: parkingId } })
                    .then(slot => {
                        res.json({ msg: 'Entry of a vehicle to the parking added' })
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    } else {
        NotFound([], res, 'Vehicle or Slot not found');
    }
}

export const getEntryVehicles = (req, res) => {
    InvoiceSQL.findAll(attributesGet(['id', 'parkingId', 'vehicleId', 'entrance']))
        .then(invoices => {
            NotFound(invoices, res, 'Entry of a Vehicle to the Parking not found')
        })
}

export const getEntryVehicle = (req, res) => {
    const entryId = req.params.entryId;
    InvoiceSQL.findAll(attributesGet(['id', 'parkingId', 'vehicleId', 'entrance'], entryId))
        .then(invoice => {
            NotFound(invoice, res, 'Entry of a Vehicle to the Parking not found');
        })
        .catch(err => console.log(err));
}

export const updateEntryVehicle = async (req, res) => {
    const entryId = req.params.entryId;
    const { parkingId, vehicleId, entrance } = req.body;
    const existId = await InvoiceSQL.findByPk(entryId);
    const existParkId = await Parking.findByPk(parkingId);
    const existVehiId = await Vehicle.findByPk(vehicleId);
    if (existId && existParkId && existVehiId) {
        updateModel(InvoiceSQL, { parkingId: parkingId, vehicleId: vehicleId, entrance: entrance }, res, { id: parkingId }, 'Entry of a vehicle');
    } else {
        NotFound([], res, 'Entry of a vehicle Not Found');
    }
}

export const updateOutputVehicle = async (req, res) => {
    const outputId = req.params.outputId;
    const { departure } = req.body;
    const { id, parkingId, entrance } = await InvoiceSQL.findByPk(outputId);
    if (id){
        const { disponibility } = await Parking.findByPk(parkingId);
        if (!disponibility) {
            const { priceDay, priceHour } = await ParkingDetail.findByPk(1);
            const entrada = new Date(entrance);
            const salida = new Date(departure);
            const horas = (salida.getTime() - entrada.getTime()) / (1000 * 3600);
            Parking.update({ disponibility: true }, { where: { id: parkingId } });
            const total = calculatedHours(Math.ceil(horas), priceHour, priceDay);
            //Hacer la coneccion con mysql
            updateModel(InvoiceSQL, { departure: departure }, res, { id: outputId }, 'Output of a vehicle');
        } else {
            NotFound([], res, 'Already checked out');
        }
    } else {
        NotFound([], res, 'Entry of Vehicle Not Found')
    }
}