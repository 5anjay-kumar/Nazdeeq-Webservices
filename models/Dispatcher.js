
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Dispatcher = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    status: { type: Boolean, required: true },
    dateOfJoin: { type: String, required: true },
    gender: { type: Boolean, required: true }
});

module.exports = mongoose.model("Dispatcher", Dispatcher);