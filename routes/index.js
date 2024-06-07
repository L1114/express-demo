var express = require("express");
var path = require("path");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../utils/jwt");

const register = path.join(__dirname, "../views/register.html");
const docs = path.join(__dirname, "../apidoc/index.html");
/* GET home page. */

router.get("/", function (req, res, next) {
  res.sendFile(register);
});

router.get("/docs", function (req, res, next) {
  res.sendFile(docs);
});

module.exports = router;
