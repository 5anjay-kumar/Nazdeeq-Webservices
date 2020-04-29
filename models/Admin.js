
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Admin = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // Nazdeeq: { type: Schema.Types.ObjectId, required: true, ref: 'Nazdeeq' },
    // ServiceType: { type: Schema.Types.ObjectId, required: true, ref: 'ServiceType' }
});

module.exports = mongoose.model("Admin", Admin);