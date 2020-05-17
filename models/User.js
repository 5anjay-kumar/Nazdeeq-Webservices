
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: false },
    gender: { type: Boolean, required: true },
    dateOfJoin: { type: Date, required: true },
    status: { type: Boolean, required: true },
    socialUserId: {type: String, required: false},
    socialProvider: {type: String, required: false}
});

module.exports = mongoose.model("User", User);