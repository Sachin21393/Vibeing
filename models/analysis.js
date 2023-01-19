const mongoose = require("mongoose");
const { Schema } = mongoose;
const {signUp}=require('./SignUp');
const analysisSchema= new Schema({
    id:{   type:Schema.Types.ObjectId,
        ref:'signUp'},
    sessionNotes:[{type:String}],
    arrayMessage:[{type:String}]

})
 const analysis = mongoose.model("analysis", analysisSchema);
 module.exports=analysis;