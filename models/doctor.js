const mongoose = require("mongoose");
const { Schema } = mongoose;
const doctorSchema=new Schema({
    name:{type:String},
    exp:{type:number},
    certificate:{type:String},
    phone:{type:Number},
    verified:{type:Boolean}
})

export const doctor = mongoose.model("doctor", doctorSchema);