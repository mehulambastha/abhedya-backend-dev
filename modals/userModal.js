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
  currentLevelInt: {
    type: Number,
    unique: false,
    default: 1
  },
  levelsCompleted: {
    type: Array,
    unique: false,
    default: [0]
  },
  timeCompletedInSeconds: {
    type: Array,
    unique: false
  }
})

module.exports = mongoose.model("User", UserSchema)