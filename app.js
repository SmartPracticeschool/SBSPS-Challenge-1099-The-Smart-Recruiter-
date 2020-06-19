const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("css"));
app.use(cors());

const auth = require("./handlers/auth");

app.use(auth);
app.listen(3030,()=>{
    console.log("Server is up");
})
