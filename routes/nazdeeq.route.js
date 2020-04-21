const express = require('express');
const app = express();
const mongoose = require("mongoose");
const nazdeeqRoute = express.Router();


let Nazdeeq = require('../models/Nazdeeq');

nazdeeqRoute.route('/secure/nazdeeq').get((req, res) => {
    Nazdeeq.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    //  res.send("Hello");
});



module.exports = nazdeeqRoute;