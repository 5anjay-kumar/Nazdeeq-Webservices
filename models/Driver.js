
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Driver = new Schema({
    serviceType: { type: String, required: true },
    cnicNo: { type: String, required: true },
    driverLicenseNo: { type: String, required: true },
    dateOfJoin: { type: String, required: true },
    status: { type: String, required: true },
    User: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}); 