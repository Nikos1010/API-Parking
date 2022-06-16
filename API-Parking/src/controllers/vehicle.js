import fs from 'fs';
import Vehicle from '../models/vehicle.js';
import VehicleColor from "../models/vehicle-color.js";
import VehicleType from "../models/vehicle-type.js";

import { NotFound } from './exception/notFoundException.js';
import { noRepeatParameter } from './exception/noRepeatParameterException.js';

import { attributesGetVehicle, attributesGetVehicles, attributesGet } from '../services/attributeSequelize.js';
import { softDelete } from '../services/softDeleteObject.js';
import { updateModel } from '../services/updateModel.js';

export const getVehicles = (req, res) => {
    Vehicle.findAll(attributesGetVehicles(VehicleType, VehicleColor))
        .then(vehicles => {
            NotFound(vehicles, res, 'Vehicles Not Found');
            const arrayData = JSON.stringify(vehicles);
            fs.writeFileSync('./src/database/vehicleData.json', arrayData,'utf-8');
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
    const existPlate = noRepeatParameter(plate, "plate");
    const existIdColor = await VehicleColor.findByPk(vehicleColorId);
    const existIdtype = await VehicleType.findByPk(vehicleTypeId);
    if (existIdColor && existIdtype) {
        if(!existPlate){
            const existingVehicleId = await Vehicle.findByPk(vehId);
            if (existingVehicleId) {
                updateModel(Vehicle, { plate: plate, vehicleColorId: vehicleColorId, vehicleTypeId: vehicleTypeId, status: status }, res, { id: vehId }, 'Vehicle');
            } else {
                NotFound([], res, 'Vehicle Not Found');
            }
        } else {
            NotFound([], res, 'Plate already exist');
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
        const existPlate = noRepeatParameter(plate, "plate");
        if(!existPlate) {
            Vehicle.create({ 
                plate: plate.toUpperCase(), 
                vehicleTypeId: vehicleTypeId, 
                vehicleColorId: vehicleColorId,
                status: status
            })
                .then(result => res.json({ msg: 'Vehicle added' }))
                .catch(err => console.log(err));
        } else {
            NotFound([], res, 'Plate already exist')
        }
    } else {
        NotFound([], res, 'Color or Type not found')
    }
}

export const getColors = (req, res) => {
    VehicleColor.findAll(attributesGet(['id', 'color']))
        .then(colors => {
            NotFound(colors, res, 'Colors Not Found');
        })
        .catch(err => console.log(err));
}

export const getColor = (req, res) => {
    const colorId = req.params.colorId;
    VehicleColor.findAll(attributesGet(['id','color'], colorId))
        .then(color => {
            NotFound(color, res, 'Color Not Found')
        })
        .catch(err => console.log(err));
}

export const updateColor = async (req, res) => {
    const colorId = req.params.colorId;
    const color = req.body.color;
    const existIdColor = await VehicleColor.findByPk(colorId);
    if(existIdColor){
        updateModel(VehicleColor, { color: color }, res, { id: colorId }, 'Color')
    } else {
        NotFound([], res, 'Color Not Found')
    }
}

//Colocar la lectura del archivo JSON, por ahora es mejor no utilizarlo
export const deleteColor = async (req, res) => {
    const colorId = req.params.colorId;
    const existIdColor = await VehicleColor.findByPk(colorId);
    if (existIdColor) {
        await VehicleColor.destroy({ where: { id: colorId } });
    } else {
        NotFound([], res, 'Color Not Found')
    }
    
}

export const postColor = (req, res) => {
    const color = req.body.color;
    VehicleColor.create({ color: color })
        .then(result => res.json({ msg: 'Color added' }))
        .catch(err => console.log(err));
}

export const getTypes = (req, res) => {
    VehicleType.findAll(attributesGet(['id', 'typeCar']))
        .then(types => {
            NotFound(types, res, 'Types Not Found');
        })
        .catch(err => console.log(err));
}

export const getType = (req, res) => {
    const typeId = req.params.typeId;
    VehicleType.findAll(attributesGet(['id', 'typeCar'], typeId))
        .then(type => {
            NotFound(type, res, 'Type Not Found');
        })
        .catch(err => console.log(err));
}

export const updateType = async (req, res) => {
    const typeId = req.params.typeId;
    const typeCar = req.body.typeCar;
    const existIdtype = await VehicleType.findByPk(typeId);
    if(existIdtype) {
        updateModel(VehicleType, { typeCar: typeCar }, res, { id: typeId }, 'Type');
    } else {
        NotFound([], res, 'Type Not Found')
    }
}

export const postType = (req, res) => {
    const vehType = req.body.typeCar;
    VehicleType.create({ typeCar: vehType })
        .then(result => res.json({ msg: 'Type added' }))
        .catch(err => console.log(err));
}

