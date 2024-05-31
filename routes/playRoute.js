const express = require("express")
const router = express.Router()
const {fetchQuestion, submitAnswer, updateLeaderboard, insertSampleData} = require("../controllers/gameController")
const verifyUser = require("../middleware/verifyUser")

router.route("/").post(verifyUser, fetchQuestion)
router.route("/enter").post(insertSampleData)
router.route('/leaderboard').get(updateLeaderboard)
router.route("/submit").post(verifyUser, submitAnswer)
router.route("/insert").post(insertSampleData)

module.exports = router