const express = require('express');
const app = express();
const mongoose = require("mongoose");
const transactionRoute = express.Router();


let Transaction = require('../models/Transaction');


transactionRoute.route('/secure/transaction').get((req, res) => {
    Transaction.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    //  res.send("Hello");
});

transactionRoute.route('/secure/transaction').post((req, res, next) => {
    Transaction.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
            console.log(data);
        }
    })
});


module.exports = transactionRoute;