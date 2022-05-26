const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const jsYaml = require('js-yaml');
const fs = require('fs');

const vehicleRoutes = require('./routes/vehicle');
const parkingRoutes = require('./routes/parking');
const invoiceRoutes = require('./routes/invoice');

const sequelize = require('./database/db').sequelize;
const mongoConnect = require('./database/db').mongoConnect;

const Vehicle = require('./models/vehicle');
const VehicleType = require('./models/vehicle-type');
const VehicleColor = require('./models/vehicle-color');
const Parking = require('./models/parking');
const ParkingDetail = require('./models/parking-detail');
const InvoiceSQL = require('./models/invoiceSQL');

const app = express();

dotenv.config();
app.use(bodyParser.json());

app.use(vehicleRoutes);
app.use(parkingRoutes);
app.use(invoiceRoutes);
const openApiDocument = jsYaml.load(
    fs.readFileSync('spec/parking.yaml', 'utf-8'),
);
const options = { explorer: true };
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiDocument, options));


Vehicle.belongsTo(VehicleType);
VehicleType.hasMany(Vehicle);
VehicleColor.hasMany(Vehicle);
Vehicle.belongsTo(VehicleColor);
Parking.belongsTo(ParkingDetail);
ParkingDetail.hasMany(Parking);
Parking.belongsToMany(Vehicle, { through: InvoiceSQL });

sequelize
    .sync({ /*force: true*/ })
    .then(result => {
        mongoConnect(client => {
            app.listen(process.env.PORT, () => {
                console.log('Server on port', process.env.PORT);
            });
        });
    })
    .catch(err => console.log(err));

// app.get('/', (req, res) => {
//     res.send('Welcome to my API');
// });