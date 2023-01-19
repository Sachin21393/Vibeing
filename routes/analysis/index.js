const express=require("express");
const bodyParser = require("body-parser");
const  {getAnalysis,getAnalysisById,updateanalysis} = require("./controller")
const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));
router.put("/updateanalysis",async(req,res)=>{
    const result=await updateanalysis(req.body.id,req.body);
 res.json(result);   
})
router.get("/getAnalysis",async(req,res)=>{
 const result=await getAnalysis();
 res.json(result);   
})
router.post("/getAnalysisById",async(req,res)=>{
 const result=await getAnalysisById(req.body.id);
 res.json(result);   
})
module.exports = router;