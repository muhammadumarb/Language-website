const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
       type:String,
       required:true
    },
    description:{
        type:String,
    },
     level: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
      default: "BEGINNER",
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "lessons" }],

},{timestamps:true})

const courseModel = mongoose.model("courses",courseSchema)

module.exports = courseModel