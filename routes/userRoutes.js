const express = require('express')
const router = express.Router()

const {registerUser, validateLinkAndLogin} = require("../controllers/userController")

router.route("/register/").post(registerUser)
router.route('/login/:encryptedUsername/').get(validateLinkAndLogin)
router.route("/register/").get((req, res) => {
  res.status(200).json({msg: "register route hitting"})
})
router.route("/").get((req, res)=> {
  res.status(200).json({msg: "hitting user route."})
})

module.exports = router