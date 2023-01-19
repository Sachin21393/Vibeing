const mongoose = require("mongoose");
const { Schema } = mongoose;
const {signUp}=require('./SignUp');
const { doctor } =require( './doctor');

const appointmentSchema=new Schema({
    id:{   type:Schema.Types.ObjectId,
        ref:'signUp'},
   doctor:{
    type:Schema.Types.ObjectId,
        ref:'doctor'
   },
    date:{type:String},
    timing:{type:String},


    
})
 const appointment = mongoose.model("appointment", appointmentSchema);
module.exports=appointment;