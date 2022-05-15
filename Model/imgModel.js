const mongoose = require("mongoose");
const singleFileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    // required: true,
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = mongoose.model("img", singleFileSchema);
