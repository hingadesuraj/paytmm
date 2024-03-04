const mongoose = require('mongoose');
const { string } = require('zod');

const userSchema = mongoose.Schema({
    username:String,
    password : String,
    firstName:String,
    lastName:String
})


const User = mongoose.model("User",userSchema);

module.exports = User