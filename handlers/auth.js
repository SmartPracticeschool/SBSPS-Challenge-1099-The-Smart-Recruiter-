const express = require("express");
const app = express.Router();

app.get("/auth/login",(req,res)=>{
    res.render('login.ejs');
})

app.get("/auth/signup",(req,res)=>{
    res.render('signup.ejs');
})



module.exports = app;