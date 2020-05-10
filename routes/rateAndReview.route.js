const express = require('express');
const app = express();
const mongoose = require("mongoose");
const rateAndReviewRoute = express.Router();

let RateAndReview = require('../models/RateAndReview');

rateAndReviewRoute.route('/secure/rateandreview').get((req, res) => {
    RateAndReview.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


module.exports = rateAndReviewRoute;