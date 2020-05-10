
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RateAndReview = new Schema({
    rating: { type: Number, required: false },
    review: { type: String, required: false },
    type: { type: Boolean, required: false },
    Trips: { type: Schema.Types.ObjectId, required: true, ref: 'Trips' }
});

module.exports = mongoose.model("RateAndReview", RateAndReview);