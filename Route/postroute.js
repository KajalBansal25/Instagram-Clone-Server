require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
let img = require("../Model/imgModel");
let db = require("../Model/userModel");
const multer = require("multer");
const authenticateToken = require("../API/auth.js");
const { sendStatus } = require("express/lib/response");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file, ">>filefile>>>>>");
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fileNamename);
  },
});

const upload = multer({ storage });

app.post("/uploadpost", (req, res) => {
  //mei pagal ho jaoungi....
  // console.log("req file>>>>", typeof req.body.file);
  
  console.log("req.files>>>", req.files);

  console.log("req.body>>>>", req.body);
  res.send("hi kajal>>>");
});

app.delete("/deletepost/:_id", authenticateToken, (req, res) => {
  console.log("req.params._id>>>deletepost>>>", req.params._id);
  console.log("req>>>deletepost>>>", req.headers.token);
  const id = req.params._id;
  img
    .deleteOne({ _id: id })
    .then((response) => {
      console.log("response>>>deletepost>>>", response);
      res.sendStatus(200);
    })
    .catch((err) => console.log("err>>>deletepost>>>", err));
});

const _imageEncode = (arrayBuffer) => {
  let u8 = new Uint8Array(arrayBuffer);
  let b64encoded = btoa(
    [].reduce.call(
      new Uint8Array(arrayBuffer),
      (p, c) => {
        return p + String.fromCharCode(c);
      },
      ""
    )
  );
};

app.get("/getpost", (req, res) => {
  console.log("req.body>>>getprofilepost>>>", req.body);
  responseType: "arraybuffer";

  img
    .find()
    .then((response) => {
      console.log("response>>>getprofilepost>>>", response);
      res.send(response);
    })
    .catch((err) => console.log("err>>>getprofilepost>>>", err));
});

module.exports = app;
