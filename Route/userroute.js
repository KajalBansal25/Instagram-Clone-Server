require("dotenv").config();
const express = require("express");
const router = express.Router();
const user = require("../Model/userModel");
const jwt = require("jsonwebtoken");

router.post("/login", async  (req, res)=> {
  console.log("login>>>", req.body);
  const { username, password } = req.body;

  const oldUser = {
    username,
    password,
  };

  console.log(oldUser);
  const accessToken = jwt.sign(oldUser, process.env.ACCESS_TOKEN_SECRET, {
    // expiresIn: "1800s",
  });

  await user
    .findOne({ username })
    .then((response) => {
      console.log("login response data>>", response);
      if (response) {
        res.send({
          success: true,
          data: { response, accessToken },
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
  const { email, password, fullname, username, mobile } = req.body;
  console.log("credentials>>>signup>>>", req.body);

  const oldUser = new user({
    email,
    password,
    fullname,
    username,
    mobile,
  });

  const accessToken = jwt.sign(oldUser.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    // expiresIn: "1800s",
  });

  const isExisting = await user.findOne({
    username,
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
          data: {response,accessToken},
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
