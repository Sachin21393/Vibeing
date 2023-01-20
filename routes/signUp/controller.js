
const {CustomResponse} = require("../../ApiConstants");
const APIConstants=require("../../ApiConstants")
const signUp =require( "../../models/SignUp");
 const createSignup=async(req)=>{
    try{
        console.log(req);
        const signup=new signUp({
            ...req
        });
        const result=await signup.save();

        return CustomResponse(null, APIConstants.Status.Success, APIConstants.StatusCode.Ok, result, null);
    } catch (error) {
        console.log(error.message);
        return CustomResponse('Error while fetching signUp!', APIConstants.Status.Failure, APIConstants.StatusCode.BadRequest, null, error.message);
    }
}

 const updateSignup=async(req,id)=>{
    try{
       
        const result=await signUp.findOneAndUpdate({_id:id},{...req},{new:true});

        return CustomResponse(null, APIConstants.Status.Success, APIConstants.StatusCode.Ok, result, null);
    } catch (error) {
        console.log(error.message);
        return CustomResponse('Error while fetching signUp!', APIConstants.Status.Failure, APIConstants.StatusCode.BadRequest, null, error.message);
    }
}
 const getsignUp=async()=>{
    try{
        const result=await signUp.find({});
        return CustomResponse(null, APIConstants.Status.Success, APIConstants.StatusCode.Ok, result, null);
    } catch (error) {
        console.log(error.message);
        return CustomResponse('Error while fetching signUp!', APIConstants.Status.Failure, APIConstants.StatusCode.BadRequest, null, error.message);
    }
}
 const getSignUpById=async(id)=>{
    try{
        const result=await signUp.findOne({_id:id});
        if(result){
            return CustomResponse(null, APIConstants.Status.Success, APIConstants.StatusCode.Ok, result, null);
        } else{
            return CustomResponse("Id not found", APIConstants.Status.Warning, APIConstants.StatusCode.NoContent, null, null);
        }
    } catch (error) {
        console.log(error.message);
        return CustomResponse('Error while fetching signUp!', APIConstants.Status.Failure, APIConstants.StatusCode.BadRequest, null, error.message);
    }
}
module.exports.createSignup= createSignup;
module.exports.getsignUp=getsignUp
module.exports.getSignUpById=getSignUpById
module.exports.updateSignup=updateSignup