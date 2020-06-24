const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
  res.render("home.ejs", { user:req.session.user ,status:false ,flag:0});
});

app.get("/profile", (req, res) => {
  res.render("profile.ejs", { user:req.session.user});
});

app.get("/app/editor",(req,res)=>{
  res.render("editor.ejs");
})

module.exports = app;
