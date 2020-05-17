
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Driver = new Schema({
    serviceType: { type: String, required: true },
    cnicNo: { type: String, required: true },
    driverLicenseNo: { type: String, required: true },
    dateOfJoin: { type: Date, required: true },
    status: { type: Boolean, required: true },
    User: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}); 

module.exports = mongoose.model("Driver", Driver);