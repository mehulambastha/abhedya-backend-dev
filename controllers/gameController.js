const expressAsync = require("express-async-handler")
const Question = require("../modals/questionModal")
const User = require("../modals/userModal")

const fetchQuestion = expressAsync(async(req, res) => {
  const {questionLevelRequested} = req.body

  const question = await Question.find({level: questionLevelRequested})

})
const submitAnswer = expressAsync(async(req, res) => {
  const {questionLevelRequested} = req.body

  const question = await Question.find({level: questionLevelRequested})

})
const updateLeaderboard = expressAsync(async(req, res) => {
  const {questionLevelRequested} = req.body

  const question = await Question.find({level: questionLevelRequested})

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