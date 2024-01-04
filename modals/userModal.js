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
  password: {
    type: String,
    unique: false,
    required: [true, 'Enter a password!']
  },
  currentLevel: {
    type: Number,
    unique: false,
    required: [false, 'Current level unavailable']
  },
  points: {
    type: Number,
    unique: false,
    required: [false, 'Give points']
  },
  timeCompletedInSeconds: {
    type: Array,
    unique: false
  }
})

module.exports = mongoose.model("User", UserSchema)