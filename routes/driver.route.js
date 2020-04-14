const express = require('express');
const app = express();
const mongoose = require("mongoose");
const driverRoute = express.Router();

// Teacher model
let Driver = require('../models/Driver');

// Get All Teachers
driverRoute.route('/secure/driver').get((req, res) => {
    Driver.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
  //  res.send("Hello");
});


driverRoute.route('/secure/driver').post((req, res, next) => {
    Driver.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});

module.exports = driverRoute;