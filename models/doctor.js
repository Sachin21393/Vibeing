const mongoose = require("mongoose");
const { Schema } = mongoose;
const doctorSchema=new Schema({
    name:{type:String},
    exp:{type:Number},
    certificate:{type:String},
    phone:{type:Number},
    verified:{type:Boolean}
})

const doctor = mongoose.model("doctor", doctorSchema);
module.exports=doctor
