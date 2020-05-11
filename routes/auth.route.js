const express = require('express');
const app = express();
const authRoute = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config.js");
let Admin = require('../models/Admin');
let User = require('../models/User');
var nodemailer = require('nodemailer');
const emailSender = require("../send-email");


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

authRoute.route('/local/signup').post(async (req, res, next) => {
    var checkEmail = await validateEmailAccessibility(req.body.email);
    var checkPhoneNo = await validatePhoneNoAccessibility(req.body.phoneNo);
    if (!checkEmail) {
        if (!checkPhoneNo) {
            User.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                }
                else {
                    res.json(data)
                    console.log(data);
                }
            })
        } else {
            res.status(400).json({
                errorMessage: "User already exists with given phone number"
            });
        }
    } else {
        res.status(400).json({
            errorMessage: "User already exists with given email address"
        });
    }
});

authRoute.route('/social/signup').post(async (req, res, next) => {
    var checkEmail = await validateEmailAccessibility(req.body.email);
    var checkPhoneNo = await validatePhoneNoAccessibility(req.body.phoneNo);
    if (!checkEmail) {
        if (!checkPhoneNo) {
            User.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.json(data)
                    console.log(data);
                    emailSender.sendEmail(req.body.email, req.body.firstName);
                }
            })
        } else {
            res.status(400).json({
                errorMessage: "User already exists with given phone number"
            });
        }
    } else {
        res.status(400).json({
            errorMessage: "User already exists with given email address"
        });
    }
});


authRoute.route('/social/signin').post(async (req, res, next) => {

    User.findOne({ socialUserId: req.body.socialUserId }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            if (data) {
                const token = getToken(data, 'user');
                res.json({
                    token: token
                });
            } else {
                res.status(400).json({
                    errorMessage: "User does not exists, please register your account"
                });
            }
        }
    });
});

authRoute.route('/signup').post(async (req, res, next) => {

    User.findOne({ socialUserId: req.body.socialUserId }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            if (data) {
                const token = getToken(data, 'user');
                res.json({
                    token: token
                });
            } else {
                res.status(400).json({
                    errorMessage: "User does not exists, please register your account"
                });
            }
        }
    });
});

function validateEmailAccessibility(email) {
    return User.findOne({ email: email }).then(function (result) {
        return result !== null;
    });
}

function validatePhoneNoAccessibility(phoneNo) {
    return User.findOne({ phoneNo: phoneNo }).then(function (result) {
        return result !== null;
    });
}

function loginAdmin(req, res) {
    Admin.findOne({ email: req.body.email, password: req.body.password }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            if (data) {
                const token = getToken(data, req.body.loginAs);
                res.json({
                    token: token
                });
            } else {
                res.status(400).json({
                    errorMessage: "Invalid email or password"
                });
            }
        }
    });
}

function loginUser(req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            if (data) {
                const token = getToken(data, req.body.loginAs);
                res.json({
                    token: token
                });
            } else {
                res.status(400).json({
                    errorMessage: "Invalid email or password"
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
}

module.exports = authRoute;