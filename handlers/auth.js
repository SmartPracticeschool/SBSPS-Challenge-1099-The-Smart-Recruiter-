const express = require("express");
const app = express.Router();
const Cloudant = require('@cloudant/cloudant');
console.log(process.env.NODE_ENV)
const config = require(`../config/all.${process.env.NODE_ENV}.json`);
const cloudantConfig = config.ibm_services;
const cloudant = new Cloudant({url: cloudantConfig.url, plugins: {iamauth: {iamApiKey: cloudantConfig.iamKey}}});
const db = cloudant.db.use("ibm_hackchallenge");

app.get("/auth/login",(req,res)=>{
    res.render('login.ejs');
})

app.get("/auth/signup",(req,res)=>{
    res.render('signup.ejs');
})


app.post("/auth/signup",(req,res)=>{
    const {uname,email,psw} = req.body; 
    db.insert({_id:email,username:uname,email,password:psw[0]},(err,data)=>{
        if(!err){
            res.send("successfully signed you up");
            console.log(data);
        }
        else {
            res.send("soemthig went wrong");
            console.log(err);
        }
    })
})

app.post("/auth/login",(req,res)=>{
    console.log(req.body);
    const {uname,psw} = req.body;
    
    db.get(uname, function(err, data) {
        if(!err){
            console.log(req.body);
            console.log(data);
            const {password} =data;
            
            if (password === psw) {
                console.log("Successfuly logged in");
                res.send("Successfuly logged in");
            }
            else {
                console.log("wrong password");
                res.send("Wrong password");
            }
        }
        else {
            res.send("soemthig went wrong");
            console.log(err);
        }
        // console.log('Error:', err);
        // console.log('Data:', data);
        // keep a copy of the doc so you know its revision token
        
        
      });
})




module.exports = app;