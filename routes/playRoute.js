const express = require("express")
const router = express.Router()
const {fetchQuestion, submitAnswer, updateLeaderboard, insertSampleData} = require("../controllers/gameController")
const verifyUser = require("../middleware/verifyUser")

router.route("/").get(verifyUser, fetchQuestion)
router.route("/enter").post(insertSampleData)
router.route("/").post(verifyUser, submitAnswer, updateLeaderboard)

module.exports = router