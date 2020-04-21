
var mongoose = require('mongoose');
 var Schema = mongoose.Schema; 
 var Nazdeeq = new Schema({ 
     branchName: { type: String, required: true },
      city: { type: String, required: true }, 
      phoneNo: { type: String, required: true } 
    }); 

    module.exports = mongoose.model("Nazdeeq", Nazdeeq);