/**
 * Created by Administrator on 2017/4/1.
 */
var mongoose = require("mongoose");

//用户表结构
module.exports = new mongoose.Schema({
  username: String,
  password: String,
  phone: String,
  id: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
