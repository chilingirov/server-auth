//Main activities in the app
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const router = require("./router");
const mongoose = require("mongoose");

//DB setup
const DATABASE_URL = "mongodb://vasko988:vasil988@ds255715.mlab.com:55715/auth";
mongoose.connect(
  DATABASE_URL,
  { useNewUrlParser: true }
);

//App setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server is listening on port " + port);
