const express = require('express');
const bodyParser = require('body-parser');

const vehicleRoutes = require('./routes/vehicle');

const sequelize = require('./database/db');
const Vehicle = require('./models/vehicle');
const VehicleType = require('./models/vehicle-type');
const VehicleColor = require('./models/vehicle-color');
const Parking = require('./models/parking');
const ParkingDetail = require('./models/parking-detail');
const Invoice = require('./models/invoice');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(vehicleRoutes);


Vehicle.belongsTo(VehicleType);
VehicleType.hasMany(Vehicle);
VehicleColor.hasMany(Vehicle);
Vehicle.belongsTo(VehicleColor);
Parking.belongsTo(ParkingDetail);
ParkingDetail.hasMany(Parking);
Parking.belongsToMany(Vehicle, { through: Invoice });

sequelize
    .sync({ /*force: true*/ })
    .then(result => {
        app.listen(app.get('port'), () => {
            console.log('Server on port ', app.get('port'));
        });
    })
    .catch(err => console.log(err));

// app.get('/', (req, res) => {
//     res.send('Welcome to my API');
// });