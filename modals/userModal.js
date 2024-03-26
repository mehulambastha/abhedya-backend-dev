const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  type: {
    type: Number,
    unique: false,
    default: 1
  },
  firstName: {
    type: String,
    unique: false,
  },
  lastName: {
    type: String,
    unique: false,
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Enter a username!']
  },
  email: {
    type: String,
    unique: true,
    required: [false, 'Enter a email!']    
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
  },
  startedAbhedya: {
    type: Boolean,
    default: false,
  },
  prevQuestionTimeStamp: {
    type: Date,
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  loginLink: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("User", UserSchema)