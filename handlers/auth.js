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
        if(!err)
            res.send("successfully signed you up");
        else
            res.send("soemthig went wrong");
    })
})


module.exports = app;