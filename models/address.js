const mongoose = require("mongoose");
const { Schema } = mongoose;
const {signUp}=require('./SignUp');
const addressSchema= new Schema({
    id:{   type:Schema.Types.ObjectId,
        ref:'signUp'},
    place_id:{type:String},
    sublocality_1:{type:String},
    sublocality_2:{type:String},
    postcode:{type:Number},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    route:{type:String}
})

const address=mongoose.model('Address',addressSchema);
module.exports=address