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

  if (currentLevel == 15) {
    res.status(201).json({msg: 'Completed Abhedya'})
  } else {
    console.log(`----------------------Current user is----------\n`, user)
    console.log(`----------------------Current level is----------\n`, currentLevel)
    const question = await Question.findOne({level: user.currentLevelInt})
    console.log("Question is: ", question)
    res.status(200).json({question})
  }

})

const submitAnswer = expressAsync(async(req, res, next) => {
  const username = res.locals.decoded.decryptedName
  const user = await User.findOne({username})
  const currentQuestionNumber = user.currentLevelInt
  const question = await Question.findOne({level: currentQuestionNumber})
  const {userAnswer} = req.body

  if (await bcrypt.compare(userAnswer, question.correctAnswer)) {
    if (currentQuestionNumber == 15) {
      res.status(201).json({msg: "Completed."})
      return
    }
    const userCurrentLvl = user.currentLevelInt
    const nextLevelInt = userCurrentLvl + 1    
    const currentTimeStamp = Date.now()
    const timeTakenForThisLevel = currentTimeStamp - user.prevQuestionTimeStamp
    user.timeCompletedInSeconds.push(timeTakenForThisLevel)
    await user.save()
    // console.log("Correct Answer! You move on to the next question level")
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: { currentLevelInt: nextLevelInt },
        $push: { levelsCompleted:  userCurrentLvl }
      },
      { new: true } // This option returns the modified document rather than the original one
    );
    // console.log("updated user is: ", updatedUser)

    // returning the next question back to the UI
    const nextQuestion = await Question.findOne({level: currentQuestionNumber+1})
    res.status(200).json(nextQuestion ? nextQuestion : question)
    next()
  }else{  
    console.log("Wrong Answer! Try again.")
    res.status(400).send("Error wrong answer")
  } 
})

const updateLeaderboard = expressAsync(async(req, res) => {
  
  const compareTimes = (userOne, userTwo) => {

    if (userOne.currentLevelInt != userTwo.currentLevelInt) {
      return userTwo.currentLevelInt - userOne.currentLevelInt
    }
    const userOneTotalTime = userOne.timeCompletedInSeconds.reduce((a,b) => a + b, 0)
    const userTwoTotalTime = userTwo.timeCompletedInSeconds.reduce((a,b) => a + b, 0)

    if (userTwoTotalTime > userOneTotalTime) {
      return -1
    }
    if (userTwoTotalTime < userOneTotalTime){
      return 1
    }
    return 0
  }


  console.log("-------------------------------------------------------Updating Leaderboard--------------------------------\n")


  const users = await User.find({startedAbhedya: true}).sort({currentLevelInt: -1})
  console.log(users)

  console.log('-----------------these were all users-----------------------------')

  users.sort(compareTimes)

  const deadUsers = await User.find({startedAbhedya: false})

  const sortedUsers = [...users, ...deadUsers]

  console.log('Leaderboard: ', sortedUsers)

  res.status(200).json({sortedUsers})
  console.log("updated leaderboard!")

})

const insertSampleData = expressAsync(async(req, res) => {
  const data = req.body
  console.log('recieved data')

  for (const [index, value] of data.entries()) {
    console.log('current question is: ', value)
    const question = new Question(value)
    await question.save()
    console.log("saved question no.", index+1)
  }
  res.status(200).json({sucess: "something"})
  
})

// const leaderBoard = expressAsync(async(req, res) => {
//   const users = await User.find().sort({currentLevelInt: -1, timeCompletedInSeconds 
// })

const manageQuestions = expressAsync(async(req, res) => {
  const levels = await Question.find().lean()
  let uniqueIdentifier

  switch (req.method) {
      case "GET":
        console.log("All questions are: ", levels)
        res.status(200).json({levels: levels})
        break
      case "POST":
        const data = [req.body]
        console.log('recieved data', data)
        
        for (const [index, value] of data.entries()) {
          const question = new Question(value)
          await question.save()
          console.log("saved question no.", index+1)
        }
        res.status(200)
        break 
      case "PUT":

        if (req.body.uniqueIdentifier) {
          uniqueIdentifier = req.body.uniqueIdentifier
          const {objectifiedData} = req.body
            
          const existingQuestion = await Question.findOne({questionId: uniqueIdentifier})
          const updatedQuestion = await Question.findByIdAndUpdate(existingQuestion._id, objectifiedData, {new: true})
          console.log("updated question: ", updatedQuestion)
          res.status(200).send(`updated question: ${updatedQuestion}`)
        }
        break
      case "DELETE":
        if (req.body.uniqueIdentifier) {
          uniqueIdentifier = req.body.uniqueIdentifier
          
          const questionToDelete = await Question.findOne({questionId: uniqueIdentifier})
          const question =  await Question.findByIdAndDelete(questionToDelete._id)
          console.log("question deleted: ", question)
          res.status(200).send(`question deleted: ${question}`)
        }
        break
      default:
      res.status(400).send(`KYA KARRA BC METHOD HI GALAT HAI TUMHARA`)
  }
})

module.exports = {fetchQuestion, submitAnswer, updateLeaderboard, insertSampleData, manageQuestions}