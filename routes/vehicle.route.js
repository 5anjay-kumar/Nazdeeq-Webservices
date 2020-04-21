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


module.exports = vehicleRoute;