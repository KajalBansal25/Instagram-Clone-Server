const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.headers.token;
  console.log("req in middleware>>>", token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, oldUser) => {
    if (err) {
      console.log("err>>>middleware>>>", err);
      return res.sendStatus(403);
    }
    req.oldUser = oldUser;
    next();
  });
};

module.exports = authenticateToken;
