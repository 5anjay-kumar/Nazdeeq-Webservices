const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userRoute = express.Router();

let User = require('../models/User');

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

userRoute.route('/secure/user/count').get((req, res, next) => {
    User.aggregate([
        {
            $group: {
                _id: 1,
                count: {
                    $sum: 1
                }
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
})

userRoute.route('/local/signup').post((req, res, next) => {
    User.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
            // console.log(data);
        }
    })
});

// Update Passenger 
userRoute.route('/secure/passenger/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
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

// Get single Subject
// studentRoute.route('/read/:id').get((req, res) => {
//     Subject.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })


module.exports = userRoute;