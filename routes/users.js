var express = require("express");
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //保存用户注册的信息到数据库中
  var user = new User({
    username: `181${Math.floor(Math.random() * 100000000)}`,
    password: "123456",
  });
  user.save();

  res.send("respond with a resource");
});

module.exports = router;
