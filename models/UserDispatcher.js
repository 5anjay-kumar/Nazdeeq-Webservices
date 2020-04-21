
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserDispatcher = new Schema({
    User: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    Dispatcher: {type: Schema.Types.ObjectId, required: true, ref: 'Dispatcher'}}); 

    module.exports = mongoose.model("UserDispatcher", UserDispatcher);