
const {CustomResponse} = require("../../ApiConstants");
const APIConstants=require("../../ApiConstants")
const analysis =require( "../../models/analysis");


 const updateanalysis=async(id,req)=>{
    try{
       
        const result=await analysis.findOneAndUpdate({id:id}, {$push:{sessionNotes:req.notes},id:id}, {upsert: true});

        return CustomResponse(null, APIConstants.Status.Success, APIConstants.StatusCode.Ok, result, null);
    } catch (error) {
        console.log(error.message);
        return CustomResponse('Error while fetching signUp!', APIConstants.Status.Failure, APIConstants.StatusCode.BadRequest, null, error.message);
    }
}
 const getAnalysis=async()=>{
    try{
        const result=await analysis.find({});
        return CustomResponse(null, APIConstants.Status.Success, APIConstants.StatusCode.Ok, result, null);
    } catch (error) {
        console.log(error.message);
        return CustomResponse('Error while fetching signUp!', APIConstants.Status.Failure, APIConstants.StatusCode.BadRequest, null, error.message);
    }
}
 const getAnalysisById=async(id)=>{
    try{
        const result=await analysis.findOne({_id:id});
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
module.exports.updateanalysis= updateanalysis;
module.exports.getAnalysis=getAnalysis
module.exports.getAnalysisById=getAnalysisById
// module.exports.updateSignup=updateSignup