const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
  res.render("home.ejs", { user: req.session.user });
});

module.exports = app;
