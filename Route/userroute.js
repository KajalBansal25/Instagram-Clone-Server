require("dotenv").config();
const express = require("express");
const router = express.Router();
const user = require("../Model/userModel");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  console.log("login>>>", req.body);

  const { email, password } = req.body;

  const oldUser = {
    email,
    password,
  };

  console.log(oldUser);

  await user
    .findOne({ email, password })
    .then((response) => {
      console.log("login response data>>", response);
      if (response) {
        res.send({
          success: true,
          data: response,
        });
      } else {
        res.send({
          success: false,
          data: null,
        });
      }
    })
    .catch((err) => {
      console.log("error in login>>>", err);
    });
});

router.route("/signup").post(async (req, res) => {
  const { email, username, fullname, phone, password } = req.body;
  console.log("credentials>>>signup>>>", req.body);

  const oldUser = new user({
    email,
    username,
    fullname,
    phone,
    password,
  });

  const isExisting = await user.findOne({
    email,
  });
  console.log("Isexisting:", isExisting);
  if (isExisting) {
    res.send({
      success: false,
      data: null,
    });
  } else {
    oldUser
      .save()
      .then((response) => {
        console.log("DBSAVE>>signup>>>", response);
        res.send({
          success: true,
          data: response,
        });
      })
      .catch((err) => console.log("DBSAVE>>>>err>>", err));
  }
});

router.route("/forget").post((req, res) => {
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
});

router.route("/reset").post((req, res) => {
  const email = req.body.email;
  const mobile = req.body.mobile;
  const username = req.body.username;
});

module.exports = router;
