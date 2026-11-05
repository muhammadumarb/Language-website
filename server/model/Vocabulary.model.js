const mongoose = require('mongoose')


const vocabularySchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lessons",
    required: true
  },
  word: {
    type: String,
    required: true
  },
  pinyin: String,
  englishMeaning: {
    type: String,
    required: true
  },
  urduMeaning: {
    type: String,
    required: true
  },
  partOfSpeech: String,
  audio: String
}, { timestamps: true });

vocabularySchema.index({ lessonId: 1, word: 1 }, { unique: true });

const vocabularyModel = mongoose.model('vocabulary', vocabularySchema)

module.exports = vocabularyModel