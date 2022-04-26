require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
let img = require("../Model/imgModel");
let db = require("../Model/userModel");
const multer = require("multer");
const authenticateToken = require("../API/auth.js");
const { sendStatus } = require("express/lib/response");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    console.log("FILENAME", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/uploadpost", upload.single("image"),authenticateToken, (req, res) => {
  console.log("req>>>uploadpost>>>", req.headers.token);
  const {
    originalname: fileName,
    path: filePath,
    mimetype: fileType,
  } = req.file || {};
  const fileSize = fileSizeFormatter(req.file.size, 2);
  const postedBy = req.body.postedBy;
  const username = req.body.username;

  console.log("uploadpost>>>", fileName);
  const oldFile = new img({
    fileName,
    filePath,
    fileType,
    fileSize,
    postedBy,
    username,
  });

  oldFile
    .save()
    .then((response) => {
      console.log("Db save :", response);
      res.send({
        success: true,
        data: response,
      });
    })
    .catch((err) => console.log("DBsave>>Err", err));
});

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    fileName;
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

app.delete("/deletepost/:_id", authenticateToken,(req, res) => {
  console.log("req.params._id>>>deletepost>>>", req.params._id);
  console.log("req>>>deletepost>>>", req.headers.token);
  const id = req.params._id;
  img
    .deleteOne({ _id: id })
    .then((response) => {
      console.log("response>>>deletepost>>>", response);
      res.sendStatus(200)
    })
    .catch((err) => console.log("err>>>deletepost>>>", err));
    
});

app.post("/getpost", authenticateToken, (req, res) => {
  console.log("req.body>>>getprofilepost>>>", req.body);
  console.log("req>>>getprofilepost>>>", req.headers.token);
  if (req.body.id === "") {
    img
      .find()
      .then((response) => {
        console.log("response>>>getprofilepost>>>inside if", response);
        res.send(response);
      })
      .catch((err) => console.log("err>>>getprofilepost>>>if", err));
  } else {
    img
      .find({ postedBy: req.body.id })
      .then((response) => {
        console.log("response>>>getprofilepost>>>else", response);
        res.send(response);
      })
      .catch((err) => console.log("err>>>getprofilepost>>>else", err));
  }
});

module.exports = app;
