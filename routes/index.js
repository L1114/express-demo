var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../utils/jwt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
    title2: "node express demo",
    users: [],
  });
});

module.exports = router;
