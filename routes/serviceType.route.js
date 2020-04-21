const express = require('express');
const app = express();
const mongoose = require("mongoose");
const serviceTypeRoute = express.Router();

let ServiceType = require('../models/ServiceType');

serviceTypeRoute.route('/secure/servicetype').get((req, res) => {
    ServiceType.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    //  res.send("Hello");
});

serviceTypeRoute.route('/secure/servicetype').post((req, res, next) => {
    ServiceType.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});


module.exports = serviceTypeRoute;