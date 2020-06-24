const express = require("express");
const app = express.Router();
const Cloudant = require('@cloudant/cloudant');
const config = require(`../config/all.${process.env.NODE_ENV}.json`);
const cloudantConfig = config['ibm_services_'+process.env.user];
const cloudant = new Cloudant({url: cloudantConfig.url, plugins: {iamauth: {iamApiKey: cloudantConfig.iamKey}}});
const db = cloudant.db.use("ibm_hackchallenge");

app.get("/auth/login",(req,res)=>{
    res.render('login.ejs',{status:false});
})

app.get("/auth/signup",(req,res)=>{
    res.render('signup.ejs',{status:false});
})


app.post("/auth/signup",(req,res)=>{
    const {uname,email,psw} = req.body;
    console.log(uname,email,psw);
    var flag_email=0;
    var flag_psw=0;
    // console.log(flag_psw,flag_email);
    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)){flag_email=1;}
    if(psw[0] === psw[1]){flag_psw=1;}
    if(!flag_email){
        res.render("signup.ejs",{status:"Not a Valid Email"});
    }
    if(!flag_psw){
        res.render("signup.ejs",{status:"Password not Matching"});
    }
    // console.log(flag_psw,flag_email);
    if(flag_email && flag_psw){
        db.insert({_id:email,username:uname,email,password:psw[0]},(err,data)=>{
            if(!err){
                req.session.user = uname;
                res.render('home.ejs',{ user:req.session.user });
            }
            else {
                res.render("signup.ejs",{status:"Something Went Wrong Try Again"});
            }
        })
    }
})

app.post("/auth/login",(req,res)=>{
    const {email,psw} = req.body;
    db.get(email, (err, data)=>{
        if(!err){
            const {password,username} =data;
            if (password === psw) {
                req.session.user = username;
                // console.log(req.session);
                res.render('home.ejs',{ user:req.session.user });
            }
            else {
                res.render("login.ejs",{status:"Wrong Email or Password"});
            }
        }
        else {
            res.render("login.ejs",{status:"Something went Wrong / Invalid Input"});
            // console.log(err);
        }
    });
});

app.get("/auth/logout",(req,res)=>{
    req.session.destroy();
    res.render("home2.0.ejs",{status:false, user:false});
})

app.get("/",(req,res)=>{
    console.log(req.session);
    res.render('home2.0.ejs',{ user:req.session.uname ,status:false });
})

module.exports = app;
