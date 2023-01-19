const mongoose = require("mongoose");
const { Schema } = mongoose;
const signUpSchema= new Schema({
    fname:String,
    lname:String,
    email:{type:String , unique:true},
    password:String,
    Phone:Number
})
const signUp = mongoose.model("signUp", signUpSchema);
module.exports=signUp