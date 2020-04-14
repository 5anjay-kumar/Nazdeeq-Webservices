const express = require('express');
const app = express();
const mongoose = require("mongoose");
const adminRoute = express.Router();

// Teacher model
let Admin = require('../models/Admin');

// Get All Teachers
adminRoute.route('/secure/admin').get((req, res) => {
    Admin.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
  //  res.send("Hello");
});

adminRoute.route('/secure/admin').post((req, res, next) => {
    Admin.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});

module.exports = adminRoute;