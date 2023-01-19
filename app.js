// import  express from "express";
const bodyParser = require("body-parser");
const express=require("express");
const mongoose =require("mongoose")
const signUp=require("./models/SignUp")
const { MessageMedia } = require('whatsapp-web.js');
const analysis=require("./models/analysis")
const axios = require("axios");
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./demo.html', 'utf8');
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
app.use("/v3",primaryRoutes);
app.use(bodyParser.urlencoded({
    extended: true
}));
  
let _id="";
const start=async()=>{
    app.post("/login",async(req,res)=>{
        let email=req.body.email;
        let pass=req.body.password;
    const result=await signUp.findOne({email:email})
    console.log(result);
    if(result.password==pass){
        _id=result._id
    }
    console.log(_id);
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
 app.get("/generate",async(req,res)=>{
    let a=(len/p)*100,b=(len/n)*100,c=(len/neg)*100;
    if(b>=c || a>=c){
        console.log("positive");

    }else{
        console.log("negative");
    }
    console.log({a,b,c});
    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
 })
    app.listen("80",async(req,res)=>{
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
      (chat)=>chat.name==="Shii baba"
     ) ;

    })
});
client.on('message',async  message => {

  console.log(message.author)
  if(message.author=='917738872498@c.us'){

  const data=message.body
  if(data=="report"){
    const media = MessageMedia.fromFilePath('./businesscard.pdf');
client.sendMessage(message.from,media);
 
  }
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
});

client.initialize();
}
start();

