const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is Required"]
    },
    email:{
      type:String,
      required:[true,"email is Required"],
      // match:[""]
    },
    password:{
         type:String,
      required:[true,"email is Required"],
      // match:[""]
    },
    role:{
      type:String,
      enum:["admin","user"],
      default:"user"
    }
},{timestamps:true})


const userModel = mongoose.model("users",userSchema)

module.exports = userModel;