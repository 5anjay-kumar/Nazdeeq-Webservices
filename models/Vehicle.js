
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vehicle = new Schema({
    vehicleName: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    numberOfSeats: { type: String, required: true },
    isDocumentVerifyed: { type: Boolean, required: true },
    Driver: { type: Schema.Types.ObjectId, required: true, ref: 'Driver' }
});

module.exports = mongoose.model("Vehicle", Vehicle);