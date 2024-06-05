const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var UserSchema=mongoose.Schema({ name: String, age:Number, status:'number' })

var UserModel=mongoose.model('User', UserSchema); 

//实例化模型 传入增加的数据
var u = new UserModel({
    name: "lisi2222",
    age: 20,
    status: true
  });
u.save();
  