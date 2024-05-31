const mongoose = require('mongoose')

const QuestionModal = mongoose.Schema({
  questionId: {
    type: String,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
    unique: true
  },
  questionTitle: {  
    type: String,
    required: false,
  },
  questionBody: {
    type: String,
    required: true,
  },
  questionAssets: {
    type: Array,
    required: false,
  },
  correctAnswer: {
    type: String,
    required: true,
    unique: true,
  },
})

module.exports = mongoose.model("questions", QuestionModal)