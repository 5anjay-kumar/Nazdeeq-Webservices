const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userRoute = express.Router();
const multer = require("multer");

// Teacher model
let User = require('../models/User');

// Get All Teachers
userRoute.route('/secure/passenger').get((req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    //  res.send("Hello");
});

userRoute.route('/secure/passenger').post((req, res, next) => {
    User.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});


module.exports = userRoute;