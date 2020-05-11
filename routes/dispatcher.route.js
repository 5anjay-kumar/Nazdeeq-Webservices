const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dispatcherRoute = express.Router();
const multer = require("multer");


let Dispatcher = require('../models/Dispatcher');

dispatcherRoute.route('/secure/dispatcher').get((req, res) => {
    Dispatcher.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    //  res.send("Hello");
});

dispatcherRoute.route('/secure/dispatcher').post((req, res, next) => {
    Dispatcher.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});

// Update Dispatcher 
dispatcherRoute.route('/secure/dispatcher/:id').put((req, res, next) => {
    Dispatcher.findByIdAndUpdate(req.params.id, {
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


module.exports = dispatcherRoute;