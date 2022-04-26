const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  mobile: Number,
  fullname: String,
  username: String,
  newPassword: String,
  confirmNewPassword: String,
});

const user = mongoose.model("user", userSchema);
module.exports = user;
