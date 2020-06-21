const express = require("express");
const cors = require("cors");
const app = express();
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(express.static("css"));
app.use(cors());

// const auth = require("./handlers/auth");
const auth = require("./handlers/auth2.0");
// const routes = require("./handlers/routes");

app.use(routes);
app.use(auth);

app.listen(3030, () => {
  console.log("Server is up");
});
