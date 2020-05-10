
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ServiceType = new Schema({
    serviceType: {type: String, required: true},
    pricePerDistance: {type: String, required: true},
    pricePerTime: {type: String, required: true},
    priceCalculationType: {type: Boolean, required: true},
    Vehicle: { type: Schema.Types.ObjectId, required: true, ref: 'Vehicle' }
}); 

module.exports = mongoose.model("ServiceType", ServiceType);