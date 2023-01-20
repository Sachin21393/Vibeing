const mongoose = require("mongoose");
const { Schema } = mongoose;
const doctor=require("./doctor");
const signUpSchema= new Schema({
    fname:String,
    lname:String,
    email:{type:String , unique:true},
    password:String,
    doctorId:{
        type:Schema.Types.ObjectId,
        ref:'doctor'

    },
    age:Number,
    Phone:Number
})
const signUp = mongoose.model("signUp", signUpSchema);
module.exports=signUp