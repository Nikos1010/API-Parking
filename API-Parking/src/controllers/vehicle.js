import Vehicle from '../models/vehicle.js';
import VehicleColor from "../models/vehicle-color.js";
import VehicleType from "../models/vehicle-type.js";
import { NotFound } from './exception/notFoundException.js';
import { attributesGetVehicle, attributesGetVehicles } from '../services/attributeSequelize.js';
import { softDelete } from '../services/softDeleteObject.js';
import { updateModel } from '../services/updateModel.js';

export const getVehicles = (req, res) => {
    Vehicle.findAll(attributesGetVehicles(VehicleType, VehicleColor))
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

export const deleteVehicle = async (req, res) => {
    const vehId = req.params.vehicleId;
    softDelete(Vehicle, vehId, res);
}

export const updateVehicle = async (req, res) => {
    const vehId = req.params.vehicleId;
    const { plate, vehicleTypeId, vehicleColorId, status } = req.body;
    const existIdColor = await VehicleColor.findByPk(vehicleColorId);
    const existIdtype = await VehicleType.findByPk(vehicleTypeId);
    if (existIdColor && existIdtype) {
        const existingVehicleId = await Vehicle.findByPk(vehId);
        if (existingVehicleId) {
            updateModel(Vehicle, { plate: plate, vehicleColorId: vehicleColorId, vehicleTypeId: vehicleTypeId, status: status }, res, { id: vehId }, 'Vehicle');
        } else {
            NotFound([], res, 'Vehicle Not Found');
        }
    } else {
        NotFound([], res, 'Color or Type not found')
    }
};
        
export const postAddVehicle = async (req, res) => {
    const { plate, vehicleTypeId, vehicleColorId, status } = req.body;
    const existIdColor = await VehicleColor.findByPk(vehicleColorId);
    const existIdtype = await VehicleType.findByPk(vehicleTypeId);
    if(existIdColor && existIdtype){
        Vehicle.create({ 
            plate: plate, 
            vehicleTypeId: vehicleTypeId, 
            vehicleColorId: vehicleColorId,
            status: status
        })
            .then(result => res.json({ msg: 'Vehicle added' }))
            .catch(err => console.log(err));
    } else {
        NotFound([], res, 'Color or Type not found')
    }
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

