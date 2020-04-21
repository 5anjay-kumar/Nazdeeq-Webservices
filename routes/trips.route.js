const express = require('express');
const app = express();
const mongoose = require("mongoose");
const tripsRoute = express.Router();


let Trips = require('../models/Trips');


tripsRoute.route('/secure/trips').get((req, res) => {
    Trips.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    //  res.send("Hello");
});

tripsRoute.route('/secure/trips').post((req, res, next) => {
    Trips.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});


module.exports = tripsRoute;