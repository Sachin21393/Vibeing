// import  express from "express";
const bodyParser = require("body-parser");
const express=require("express");
const mongoose =require("mongoose")
const signUp=require("./models/SignUp")
const doctor=require("./models/doctor")
const {CustomResponse} = require("./ApiConstants");
const APIConstants=require("./ApiConstants")
const { MessageMedia  } = require('whatsapp-web.js');
const { Buttons } = require('whatsapp-web.js/src/structures');


const analysis=require("./models/analysis")
const ejs=require("ejs");
const axios = require("axios");
var fs = require('fs');
const http=require("http")
var pdf = require('html-pdf');
var html = fs.readFileSync('./views/report.ejs', 'utf8');
var wkhtmltopdf = require('wkhtmltopdf');
var options = { format: 'Letter' };


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const qrcode = require("qrcode-terminal");
const { Client } =require( "whatsapp-web.js");
const app=express();
const primaryRoutes=require( "./routes/index.js");
const { checkPrime } = require("crypto");
// const doctor = require("./models/doctor");
app.use(express.static('public'));
app.use("/v3",primaryRoutes);
app.set('view engine', 'ejs');

// app.use('*/css',express.static('public/css'));
let id1="";

app.use(bodyParser.urlencoded({
    extended: true
}));
  
let _id="";
async function check (data){
  const see=await doctor.findOne({name:data});
  if(see) return true;
  else return false;

}

app.get("/",async(req,res)=>{
  res.render("login")
})
app.get("/gmap",async(req,res)=>{
  res.render("gmaps");
})
app.get("/rewards",async(req,res)=>{
  res.render("rewards");
})
app.get("/resources",async(req,res)=>{
  res.render("resources");
})
app.get("/podcast",async(req,res)=>{
  res.render("podcast");
})
app.get("/music",async(req,res)=>{
  res.render("music");
})
  app.get("/notes",async(req,res)=>{
  // console.log("hello");
const data=await signUp.find({});
console.log(data);
  res.render("polaroid",{data:data})

  })
  app.post("/update",async(req,res)=>{
    const result=await analysis.findOneAndUpdate({id:req.body.id},{$push:{sessionNotes:req.body.notes},id:req.body.id}, {upsert: true});
    console.log("done");
  })
    app.post("/login",async(req,res)=>{
        let email=req.body.email;
        let pass=req.body.password;
    const result=await signUp.findOne({email:email})
    console.log(result);
    if(result.password==pass){
        _id=result._id
        res.render("home");
    }
    // console.log(_id);
    })
    let p=0,n=0,neg=0,len=0;
 app.get("/analyze",async(req,res)=>{
    const data=await analysis.find({});
    len=data.length;
    data.forEach(ele=>{
        ele.arrayMessage.forEach(ele2=>{
            console.log(ele2);
            const options = {
                method: 'GET',
                url: 'https://twinword-sentiment-analysis.p.rapidapi.com/analyze/',
                params: {text: ele2},
                headers: {
                  'X-RapidAPI-Key': '919ad1b4efmsh5c64063fdf57b2ap1ecd82jsn8b07ec302f85',
                  'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                //   console.log(response.data.type);
                  if(response.data.type=="positive"){
                    p++;
                  }else if(response.data.type=="negative"){
                    neg++;
                  }else{
                    n++;
                  }
                //   console.log({p,n,neg});
              }).catch(function (error) {
                  console.error(error);
              });
        })
        // console.log({p,n,neg});
       
    })
 
 
 })
 app.get("/home",async(req,res)=>{
  res.render("home")
 })
 app.post("/createDoctor",async(req,res)=>{
  let body=req.body;
  const data=new doctor({...body});
  const result=await data.save();
  let msg=CustomResponse(null, APIConstants.Status.Success, APIConstants.StatusCode.Ok, result, null);
  res.json(msg);

 })
 app.get("/generate",async(req,res)=>{
    const data=await signUp.findById(_id);
    console.log(data);
    let mood="";
    let a=(len/p)*100,b=(len/n)*100,c=(len/neg)*100;
    if(b>=c || a>=c){
       mood="Hey your overall mood was positive"

    }else{
        mood="Hey your overall mood was neutral"
    }
    console.log({a,b,c});
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 1,
      max_tokens:100
    });
  
  function generatePrompt() {
  const my="I am feeling positive can you suggest me to do some good exercise?"
    return `${my}`;
  }
  let data2=completion.data.choices[0].text;
    
    res.render("report",{data:data,mood:mood,data2:data2},function(err,html){
        // console.log(html);
        let string =String(html)
        console.log(string);
        
        wkhtmltopdf(string, {
            output:  `${data.fname} report.pdf`
,            pageSize: 'letter'
        });
  
});
});

    app.listen(80,async(req,res)=>{
        console.log("listening on 80");
    })
    mongoose.connect("mongodb://127.0.0.1:27017/rubixDB",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
}).catch((err) => {
        console.log("Error connecting to database", err);
        
});
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
     const myGroup=chats.find(
      (chat)=>chat.name==="Chanakya"
     ) ;

    })
});
client.on('message',async  message => {

  console.log(message.author)
  // 918850708054@c.us
  // 917738872498@c.us
  if(message.author=='917738872498@c.us'){

  const data=message.body
  console.log(data.substr(6,2));


  console.log(data)
  if (data === 'Hello') {
    let button = new Buttons('My name is Zuma 🤖.Thank you for reaching out for help. We understand that taking the first step towards addressing your mental health can be difficult, but know that you are not alone and we are here to support you. Please let us know how we can best assist you and we will do our best to provide the resources and help you need."', [{ body: 'I need help' }, { body: 'Live Chat' },{body:'Book Appointment'}], 'Hi there 👋🏻', 'Take Care');
    client.sendMessage(message.from, button);
    }
    else if(data=="I need help"){
      client.sendMessage(message.from,"Hello Sachin! I am Zuma and am here for you. You can talk to me about your life or anything 😊");
    }else if(data=="Consult"){
      client.sendMessage(message.from,"We have created one counselling session for you. Here you can talk with Professional "+"https://vibeing-counselling.glitch.me");
    }else if(data=="Live Chat"){
    
      client.sendMessage(message.from,"Join this link to chat with professional "+"https://chanakya-liveagent.glitch.me")
    }else if(data=="Book Appointment"){
      const doctors=await doctor.find({});
    
      doctors.forEach(ele=>{
        let content=`Name: ${ele.name}`
        let button = new Buttons('Here are the list of Doctors', [{ body:content }], 'Hi there 👋🏻', 'Take Care');
        client.sendMessage(message.from, button);
      
      })
      



    }else if(check(data.substr(6)) && data.substr(6,2)=="Dr"){
      // console.log("hello");
      const details=await doctor.findOne({name:data.substr(6)});
      id1=details._id;
      console.log(id1);
      let content=`Name: ${details.name} exp:${details.exp} Phone: ${details.phone}`;
      let button = new Buttons('Book your appointment', [{ body:'Yes' },{body:'No'}], 'Consultation', 'Take Care');
      client.sendMessage(message.from, button);
    }else if(data=="Yes"){
      const update=await signUp.findOneAndUpdate({_id:_id},{$set:{doctorId:id1}});
      client.sendMessage(message.from, "Your appointment is booked successfully join this link to consult with your doctor https://vibeing-counselling.glitch.me");
    }else if(data=="Appointments"){
      const details=await signUp.findOne({_id:_id}).populate('doctorId')
      client.sendMessage(message.from, `Your appointment with Doctor ${details.doctorId.name}`)
    }
    
 else if(data=="report"){
  const user=await signUp.findById(_id);
  let path=`./${user.fname} report.pdf`
    const media = MessageMedia.fromFilePath(path);
client.sendMessage(message.from,media);
 
  }else if(data=="Session notes"){
    const temp=await analysis.findOne({id:_id}).populate("id").exec();
    console.log(temp);
    // let data=temp.sessionNotes;
    client.sendMessage(message.from, "Patient Name "+temp.id.fname);
    temp.sessionNotes.forEach(ele=>{
      client.sendMessage(message.from,"Counsellor Notes "+ele);
    })
  
  }
  else{
  const temp=await analysis.find({_id:_id});
  console.log(temp);

  
    analysis.findOneAndUpdate({id:_id}, {$push:{arrayMessage:data},id:_id}, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        else console.log(doc);
    });
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(),
    temperature: 1,
    max_tokens:100
  });
  console.log(completion.data.choices[0].text);
  client.sendMessage(message.from, completion.data.choices[0].text);
function generatePrompt() {
const my=data
  return `${my}`;
}
  }
}
});

client.initialize();

