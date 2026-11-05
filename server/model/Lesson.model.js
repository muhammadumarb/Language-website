const mongoose = require('mongoose')



const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  titleUrdu: String,
  description: String,

  level: {
    type: String,
    enum: ["INTRO", "BASIC", "INTERMEDIATE", "ADVANCED"],
    required: true
  },

  order: {
    type: Number,
    default: 0
  },

  vocabulary: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "vocabulary"
  }]
}, { timestamps: true });

// lessonSchema.index({ courseId: 1, order: 1 }, { unique: true });
// lessonSchema.index({ courseId: 1, title: 1 }, { unique: true });


const lessonModel = mongoose.model('lessons', lessonSchema)

module.exports = lessonModel