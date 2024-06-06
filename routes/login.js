var express = require("express");
var router = express.Router();
// const multer = require("multer"); // v1.0.5
// const upload = multer();
const jwt = require("jsonwebtoken");

var User = require("../models/User");
const { jwtSecretKey } = require("../utils/jwt");

/* GET home page. */

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log("username, password: ", username, password);
  const responseData = { code: 2, message: "success" };
  if (!username || !password) {
    responseData.code = 400;
    responseData.message = "用户名和密码不能为空";
    res.json(responseData);
    return;
  }

  //   //保存用户注册的信息到数据库中
  //   const id = `${Math.floor(Math.random() * 100000000000)}`;
  //   var user = new User({
  //     username: `zl-${Math.floor(Math.random() * 100000)}`,
  //     password: "123456",
  //     phone: `181${Math.floor(Math.random() * 100000000)}`,
  //     id,
  //   });
  //   user.save();
  //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功
  const userInfo = await User.findOne({
    username: username,
    password: password,
  }).catch(() => {});

  console.log("userInfo :>> ", userInfo);
  if (!userInfo) {
    responseData.code = 2;
    responseData.message = "用户名或密码错误";
    res.json(responseData);
    return;
  }
  //用户名和密码是正确的
  const secret = jwtSecretKey;
  const payload = { username };
  const token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 60 * 48 });
  responseData.token = token;
  responseData.code = 200;
  res.send(responseData);
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  const responseData = { code: 2, message: "error" };
  console.log("username, password: ", username, password);
  if (!username || !password) {
    responseData.code = 400;
    responseData.message = "用户名和密码不能为空";
    res.json(responseData);
    return;
  }
  const userInfo = await User.findOne({
    username: username,
  }).catch(() => {});
  if (userInfo) {
    responseData.code = 2;
    responseData.message = "用户名已注册";
    res.send(responseData);
    return;
  }
  //保存用户注册的信息到数据库中
  const id = `${Math.floor(Math.random() * 100000000000)}`;
  var user = new User({
    username,
    password,
    phone: ``,
    id,
  });
  user.save();
  responseData.code = 200;
  responseData.message = "success";
  res.send(responseData);
});

module.exports = router;
