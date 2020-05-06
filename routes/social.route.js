const express = require('express');
const app = express();
const mongoose = require("mongoose");
const socialRoute = express.Router();

let User = require('../models/User');



module.exports = socialRoute;