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

tripsRoute.route('/secure/trip/user/:userId').get((req, res, next) => {

    Trips.find({ User: mongoose.Types.ObjectId(req.params.userId) }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
        .populate([{
            path: "Driver", populate: {
                path: "User", populate: {
                    path: "Trips"
                }
            }
        }, { path: "User" }]).exec(function (err, docs) {
        });
});

tripsRoute.route('/secure/driver/user/trip').get((req, res, next) => {
    Trips.find({ date: { $gte: getCurrentDate(true), $lte: getCurrentDate(false) } }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).populate([{
        path: "Driver", populate: {
            path: "User", populate: {
                path: "Trips"
            }
        }
    }, { path: "User" }]).exec(function (err, docs) {
    });
});

function getCurrentDate(atDayStart) {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let currentDate = year + "-" + month + "-" + date;
    if (atDayStart) {
        currentDate += " 00:00:00"
    } else {
        currentDate += " 23:59:59"
    }

    return currentDate;
}

module.exports = tripsRoute;