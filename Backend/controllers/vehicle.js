const Vehicle = require("../models/vehicle");
const VehicleColor = require("../models/vehicle-color");
const VehicleType = require("../models/vehicle-type");

exports.getVehicles = (req, res) => {
    Vehicle.findAll({ include: [{ model: VehicleType }, { model: VehicleColor}] } )
        .then(vehicles => {
            if(vehicles.length > 0){
                res.json(vehicles);
            } else {
                res.status(404).send('Vehicles not found');
            }
        })
        .catch(err => console.log(err));
}

exports.getVehicle = (req, res) => {
    const vehId = req.params.vehicleId;
    Vehicle.findAll({ where: { id: vehId },include: [{ model: VehicleType }, { model: VehicleColor}] } )
        .then(vehicles => {
            console.log(vehicles);
            if (vehicles.length > 0) {
                return res.json(vehicles);
            }
            res.status(404).send('Vehicle not found');
        })
        .catch(err => console.log(err));
}

exports.postAddVehicle = (req, res) => {
    const plate = req.body.plate;
    const vehicleTypeId = req.body.vehicleTypeId;
    const vehicleColorId = req.body.vehicleColorId;
    Vehicle.create({ 
        plate: plate, 
        vehicleTypeId: vehicleTypeId, 
        vehicleColorId: vehicleColorId
    })
        .then(result => res.send('Vehicle added'))
        .catch(err => console.log(err));
}

exports.getColors = (req, res) => {
    VehicleColor.findAll()
        .then(colors => {
            if (colors.length > 0) {
                res.json(colors);
            } else {
                res.status(404).send('Colors not found');
            }
        })
        .catch(err => console.log(err));
}

exports.postColor = (req, res) => {
    const color = req.body.color;
    VehicleColor.create({ color: color })
        .then(result => res.send('Color added'))
        .catch(err => console.log(err));
}

exports.getTypes = (req, res) => {
    VehicleType.findAll()
        .then(types => {
            if (types.length > 0) {
                res.json(types);
            } else {
                res.status(404).send('Types not found');
            }
        })
        .catch(err => console.log(err));
}

exports.postType = (req, res) => {
    const vehType = req.body.typeCar;
    VehicleType.create({ typeCar: vehType })
        .then(result => res.send('Type added'))
        .catch(err => console.log(err));
}