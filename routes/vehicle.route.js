const express = require('express');
const app = express();
const mongoose = require("mongoose");
const vehicleRoute = express.Router();


let Vehicle = require('../models/Vehicle');

vehicleRoute.route('/secure/vehicle').get((req, res) => {
    Vehicle.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    //  res.send("Hello");
});


vehicleRoute.route('/secure/vehicle/count').get((req, res, next) => {
    Vehicle.aggregate([
        {
            $group: {
                _id: 1,
                count: {
                    $sum: 1
                }
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
})

vehicleRoute.route('/secure/vehicle').post((req, res, next) => {
    Vehicle.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});

vehicleRoute.route('/secure/vehicle/:id').get((req, res) => {
    Vehicle.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).populate({ path: 'Driver' })
        .exec(function (err, data) {
        });
});

vehicleRoute.route('/secure/vehicle/driver/:driverId').get((req, res) => {

    Vehicle.findOne({ Driver: mongoose.Types.ObjectId(req.params.driverId) }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
        .populate({
            path: "Driver", populate: {
                path: "User",
                model: "User"
            }
        }).exec(function (err, docs) {
        });
});

module.exports = vehicleRoute;