
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Transaction = new Schema({
    date: {type: String, required: true},
    totalAmount: {type: String, required: true},
    paidAmount: {type: String, required: true},
    // type: {type: String, required: true},
    status: {type: Boolean, required: true},
    Trips: {type: Schema.Types.ObjectId, required: true, ref: 'Trips'}}); 

    module.exports = mongoose.model("Transaction", Transaction);