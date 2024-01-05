const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Enter a username!']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Enter a email!']    
  },
  currentLevel: {
    type: Number,
    unique: false
  },
  points: {
    type: Number,
    unique: false
  },
  timeCompletedInSeconds: {
    type: Array,
    unique: false
  }
})

module.exports = mongoose.model("User", UserSchema)