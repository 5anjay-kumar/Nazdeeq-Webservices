const express = require('express');
const app = express();
const authRoute = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config.js");
let Admin = require('../models/Admin');
let User = require('../models/User');


authRoute.route("/login").post((req, res) => {
    let loginAs = req.body.loginAs;
    console.log(loginAs);
    if (loginAs == "admin") {
        loginAdmin(req, res);
    } 
    else if (loginAs == "user") {
        loginUser(req, res);
    }
});

function loginAdmin(req, res) {
    Admin.findOne({ email: req.body.email, password: req.body.password }, (error, data) => {
        console.log("Data", data);
        console.log("Error", error);

        if (error) {
            return next(error)
        } else {
            if (data) {
                const token = getToken(data, req.body.loginAs);
                res.json({
                    token: token
                });
            }
        }
    });
}

function loginUser(req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, (error, data) => {
        console.log("Data", data);
        console.log("Error", error);

        if (error) {
            return next(error)
        } else {
            if (data) {
                const token = getToken(data, req.body.loginAs);
                res.json({
                    token: token
                });
            }
        }
    });
}


function getToken(data, role) {
    const payload = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: role
    };

    const token = jwt.sign(payload,
        config.tokenSecret,
        {
            expiresIn: config.tokenExpiry // expires in 1 hour
        }
    );

    return token;
    // return the JWT token for the future API calls
    /*
    res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
    });*/
}

module.exports = authRoute;