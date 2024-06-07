var express = require("express");
var router = express.Router();
var User = require("../models/User");

router.get("/", async (req, res, next) => {
  const users = await User.find().limit(20);
  console.log("users: ", users);
  res.render("index", { title: "Express", title2: "node express demo", users });
});

module.exports = router;
