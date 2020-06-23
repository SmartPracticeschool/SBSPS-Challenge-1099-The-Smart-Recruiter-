const express = require("express");
const app = express.Router();
const Cloudant = require('@cloudant/cloudant');
const config = require(`../config/all.${process.env.NODE_ENV}.json`);
const cloudantConfig = config['ibm_services_'+process.env.user];
const cloudant = new Cloudant({url: cloudantConfig.url, plugins: {iamauth: {iamApiKey: cloudantConfig.iamKey}}});
const db = cloudant.db.use("ibm_hackchallenge");

app.post("/auth/signup",(req,res)=>{
    const {uname,email,psw} = req.body;
    // console.log(uname,email,psw);
    var flag_email=0;
    var flag_psw=0;
    // console.log(flag_psw,flag_email);
    if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)){flag_email=1;}
    if(psw[0] === psw[1]){flag_psw=1;}
    if(!flag_email){
        res.render("home.ejs",{status:"Not a Valid Email", user:req.session.user, flag:2});
    }
    else if(!flag_psw){
        res.render("home.ejs",{status:"Password not Matching", user: req.session.user, flag:2});
    }
    // console.log(flag_psw,flag_email);
    else if(flag_email && flag_psw){
        db.insert({_id:email,username:uname,email,password:psw[0]},(err,data)=>{
            if(!err){
                req.session.user = uname;
                res.render('home.ejs',{status:false, user:req.session.user, flag:2});
            }
            else {
                res.render("home.ejs",{status:"Something Went Wrong Try Again", user:req.session.user, flag:2});
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
                res.render('home.ejs',{ status: false ,user:req.session.user , flag:0});
            }
            else {
                res.render("home.ejs",{status:"Wrong Email or Password",user:req.session.user, flag:1});
            }
        }
        else {
            res.render("home.ejs",{status:"Something went Wrong OR Invalid Input",user:req.session.user, flag:1});
            // console.log(err);
        }
    });
});

app.get("/auth/logout",(req,res)=>{
    req.session.destroy();
    console.log("destroy");
    res.render("home.ejs",{status:false, user:false ,flag:0});
})

module.exports = app;
