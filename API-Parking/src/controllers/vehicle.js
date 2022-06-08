import Vehicle from '../models/vehicle.js';
import VehicleColor from "../models/vehicle-color.js";
import VehicleType from "../models/vehicle-type.js";
import { NotFound } from './exception/notFoundException.js';
import { attributesGetVehicle } from './attributeSequelize.js';

export const getVehicles = (req, res) => {
    Vehicle.findAll(attributesGetVehicle(VehicleType, VehicleColor))
        .then(vehicles => {
            NotFound(vehicles, res, 'Vehicles Not Found');
        })
        .catch(err => console.log(err));
}

export const getVehicle = (req, res) => {
    const vehId = req.params.vehicleId;
    Vehicle.findAll(attributesGetVehicle(VehicleType, VehicleColor, vehId))
        .then(vehicles => {
            NotFound(vehicles, res, 'Vehicle Not Found');
        })
        .catch(err => console.log(err));
}

export const deleteVehicle = (req, res) => {
    const vehId = req.params.vehicleId;
    Vehicle.update({ status: false }, { where: { id: vehId }})
        .then(vehicles => {
            console.log(vehicles)
            NotFound(vehicles, res, 'Vehicle Not Found');
        })
        .catch(err => console.log(err));
}

export const postAddVehicle = (req, res) => {
    const plate = req.body.plate;
    const vehicleTypeId = req.body.vehicleTypeId;
    const vehicleColorId = req.body.vehicleColorId;
    const status = req.body.status;
    Vehicle.create({ 
        plate: plate, 
        vehicleTypeId: vehicleTypeId, 
        vehicleColorId: vehicleColorId,
        status: status
    })
        .then(result => res.json({ msg: 'Vehicle added' }))
        .catch(err => console.log(err));
}

export const getColors = (req, res) => {
    VehicleColor.findAll()
        .then(colors => {
            NotFound(colors, res, 'Colors Not Found');
        })
        .catch(err => console.log(err));
}

export const postColor = (req, res) => {
    const color = req.body.color;
    VehicleColor.create({ color: color })
        .then(result => res.json({ msg: 'Color added' }))
        .catch(err => console.log(err));
}

export const getTypes = (req, res) => {
    VehicleType.findAll()
        .then(types => {
            NotFound(types, res, 'Types Not Found');
        })
        .catch(err => console.log(err));
}

export const postType = (req, res) => {
    const vehType = req.body.typeCar;
    VehicleType.create({ typeCar: vehType })
        .then(result => res.json({ msg: 'Type added' }))
        .catch(err => console.log(err));
}