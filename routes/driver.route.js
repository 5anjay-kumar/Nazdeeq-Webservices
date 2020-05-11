const express = require('express');
const app = express();
const mongoose = require("mongoose");
const driverRoute = express.Router();

let Driver = require('../models/Driver');
let Vehicle = require('../models/Vehicle');

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

driverRoute.route('/secure/driver/:id').get((req, res) => {
    Driver.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).populate({ path: 'User' })
        .exec(function (err, data) {
        });
});

// Update Driver 
driverRoute.route('/secure/driver/:id').put((req, res, next) => {
    Driver.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    //   console.log('Data updated successfully')
    }
  })
})


module.exports = driverRoute;