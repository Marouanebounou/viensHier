const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const userSchema = new mongoose.Schema({
    fullName: {type: String , required: true},
    email:{type:String, required:true},
    number:{type:Number ,required:true}
});
module.exports.User=mongoose.model('User',userSchema);