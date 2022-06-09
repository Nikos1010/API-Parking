import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import swaggerUI from 'swagger-ui-express';
import vehicleRoutes from './routes/vehicle.js';
import jsYaml from 'js-yaml';
import fs from 'fs';


const app = express();

dotenv.config();

app.set('port', process.env.PORT);
app.use(express.json());

app.use(vehicleRoutes);

//Swagger config
const openApiDocument = jsYaml.load(
    fs.readFileSync('src/spec/parking.yaml', 'utf-8'),
);
const options = { explorer: true };

app.use(cors())
app.use('/docs', swaggerUI.serve, swaggerUI.setup(openApiDocument, options));

export default app;

import Vehicle from './models/vehicle.js';
import VehicleType from './models/vehicle-type.js';
import VehicleColor from './models/vehicle-color.js';

Vehicle.belongsTo(VehicleType);
VehicleType.hasMany(Vehicle);
VehicleColor.hasMany(Vehicle);
Vehicle.belongsTo(VehicleColor);