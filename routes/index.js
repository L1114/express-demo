var express = require("express");
var path = require("path");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../utils/jwt");

const register = path.join(__dirname, "../views/register.html");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(register);
});

module.exports = router;
