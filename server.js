const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const url = "mongodb://127.0.0.1:27017/myinstaappdb";

app.use(cors());
// app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use("/uploadpost", express.static("uploads"));
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }))


mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection done with mongodb"))
  .catch((err) => console.log(err));

app.listen(8086, function () {
  console.log("example app listening at 8086");
});

app.use("/user", require("./Route/userroute"));
app.use("/post", require("./Route/postroute"));
