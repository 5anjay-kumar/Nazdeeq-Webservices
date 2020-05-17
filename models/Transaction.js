
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Transaction = new Schema({
    date: {type: String, required: true},
    totalAmount: {type: Number, required: true},
    paidAmount: {type: Number, required: true},
    // type: {type: String, required: true},
    status: {type: Boolean, required: true},
    Trips: {type: Schema.Types.ObjectId, required: true, ref: 'Trips'}}); 

    module.exports = mongoose.model("Transaction", Transaction);