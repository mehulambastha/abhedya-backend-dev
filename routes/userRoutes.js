const express = require('express')
const router = express.Router()

const {registerUser} = require("../controllers/userController")

router.route("/register/").post(registerUser)
router.route("/register/").get((req, res) => {
  res.status(200).json({msg: "register route hitting"})
})
router.route("/").get((req, res)=> {
  res.status(200).json({msg: "hitting user route."})
})

module.exports = router