
var mongoose=require('mongoose');

var usersSchema=require('../schema/users')

module.exports=mongoose.model('User',usersSchema);