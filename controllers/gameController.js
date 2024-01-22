const expressAsync = require("express-async-handler")
const Question = require("../modals/questionModal")
const User = require("../modals/userModal")
const bcrypt = require("bcrypt")

const fetchQuestion = expressAsync(async(req, res) => {
  console.log(`-------------------------------------------\nfetch route hitting`)
  const decodedData = res.locals.decoded
  console.log("the recieved data is: ", decodedData)
  const username = decodedData.decryptedName
  const user = await User.findOne({username})
  const currentLevel = user.currentLevelInt
  console.log(`----------------------Current user is----------\n`, user)
  console.log(`----------------------Current level is----------\n`, currentLevel)
  const question = await Question.findOne({level: user.currentLevelInt})
  console.log("Question is: ", question)
  res.status(200).json({question})

})

const submitAnswer = expressAsync(async(req, res, next) => {
  const username = res.locals.decoded.decryptedName
  const user = await User.findOne({username})
  const currentQuestionNumber = user.currentLevelInt
  const question = await Question.findOne({level: currentQuestionNumber})
  const {userAnswer} = req.body
  
  if (userAnswer !== question.correctAnswer) {
    console.log("Wrong Answer! Try again.")
    res.status(400).send("Error wrong answer")
  }else{  
    const nextLevelInt = user.currentLevelInt + 1    
    console.log("Correct Answer! You move on to the next question level")
    const updatedUser = await User.findByIdAndUpdate(user._id, {$set: {currentLevelInt: nextLevelInt}}, {$push: {levelsCompleted: nextLevelInt}})
    console.log("updated user is: ", updatedUser)

    // returning the next question back to the UI
    const nextQuestion = await Question.findOne({level: questionNumber+1})
    res.status(200).json(nextQuestion ? nextQuestion : question)
    next()
  } 
})

const updateLeaderboard = expressAsync(async(req, res) => {
  console.log("-------------------------------------------------------Updating Leaderboard--------------------------------\n")
  const sortedUsers = await User.find().sort({currentLevelInt: -1, timeCompletedInSeconds: 1})
  res.status(200)
  console.log("updated leaderboard!")
  console.log(sortedUsers)
})

const insertSampleData = expressAsync(async(req, res) => {
  const data = req.body
  console.log('recieved data')


  for (const [index, value] of data.entries()) {
    const question = new Question(value)
    await question.save()
    console.log("saved question no.", index+1)
  }
  res.status(200).json({sucess: "something"})

})

module.exports = {fetchQuestion, submitAnswer, updateLeaderboard, insertSampleData}