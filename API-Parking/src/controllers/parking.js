const Parking = require('../models/parking');
const ParkingDetail = require('../models/parking-detail');

exports.getParkingSlots = (req, res) => {
    Parking.findAll()
        .then(slots => {
            if (slots.length > 0) {
                res.json(slots);
            } else {
                res.status(404).send('Slots not found');
            }
        })
        .catch(err => console.log(err));
}

exports.getParkingDetail = (req, res) => {
    ParkingDetail.findAll()
        .then(details => {
            if (details.length > 0) {
                res.json(details);
            } else {
                res.status(404).send('Details not found');
            }
        })
        .catch(err => console.log(err));
}

exports.postAddDetail = (req, res) => {
    const priceHour = req.body.priceHour;
    const priceDay = req.body.priceDay;
    const numberSlots = req.body.numberSlots;
    ParkingDetail.create({
        priceHour: priceHour,
        priceDay: priceDay,
        numberSlots: numberSlots
    })
        .then(result => {
            for(let i = 1; i <= numberSlots; i++) {
                Parking.create({
                    disponibility: true,
                    parkingDetailId: 1
                })
                .catch(err => console.log(err));
            }
            res.send('Detiail and Slots of Parking Added');
        })
        .catch(err => console.log(err));
}
