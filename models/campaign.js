const mongoose = require("mongoose");
const { Schema } = mongoose;
const {signUp}=require('./SignUp');
const campaignSchema=new Schema({
    id:{   type:Schema.Types.ObjectId,
        ref:'signUp'},
    title:{type:String},
    content:{type:String}
})
const campaign = mongoose.model("campaign", campaignSchema);
module.exports=campaign