const express=require("express");
const bodyParser = require("body-parser");

const  {createSignup,getsignUp,getSignUpById,updateSignup} = require("./controller")
const router = express.Router();
router.use(bodyParser.urlencoded({
    extended: true
}));
router.post("/createSignup",async(req,res)=>{
  console.log(req.body);
    const result=await createSignup(req.body);
    res.status(200).json(result);
})
router.put("/updateSignup",async(req,res)=>{
    const result=await updateSignup(req.body,req.body.id);
 res.json(result);   
})

// router.delete("/deleteAddress/:id",async(req,res)=>{
//     const result=await deleteAddress(req.params.id);
//     res.json(result);
// })
router.get("/getSignUp",async(req,res)=>{
 const result=await getsignUp();
 res.json(result);   
})
router.get("/getSignUpById",async(req,res)=>{
 const result=await getSignUpById(req.body.id);
 res.json(result);   
})

module.exports = router;