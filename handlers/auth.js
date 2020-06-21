const express = require("express");
const app = express.Router();
const Cloudant = require('@cloudant/cloudant');
const config = require(`../config/all.${process.env.NODE_ENV}.json`);
const cloudantConfig = config['ibm_services_'+process.env.user];
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
    const {uname,psw} = req.body;
    
    db.get(uname, (err, data)=>{
        if(!err){
            const {password} =data;
            
            if (password === psw) {
                res.send("Successfuly logged in");
            }
            else {
                res.send("Wrong password");
            }
        }
        else {
            res.send("soemthig went wrong");
            console.log(err);
        }
    });
})

app.get("/",(req,res)=>{
    res.render('home.ejs');
})

module.exports = app;
