const express = require('express')
const router = express.Router()

const {registerUser, validateLinkAndLogin, userDetails, startAbhedya} = require("../controllers/userController")
const {superUserController, manageUsers, superUserLogin} = require("../controllers/userController")
const {manageQuestions} = require("../controllers/gameController")
const {verifySuperUser} = require("../middleware/verifySuperUser")
const verifyUser = require("../middleware/verifyUser")

router.route("/register/").post(registerUser)
router.route("/login/:encryptedUsername/").get(validateLinkAndLogin)
router.route("/login/:id").get((req, res) => {
  const id = req.params.id
  res.status(200).send("htting login route, id is: ", id)
})
router.route("/register/").get((req, res) => {
  res.status(200).json({msg: "register route hitting"})
})
router.route("/get_detail_startedAbhedya/").post(verifyUser, userDetails)
router.route("/startAbhedya/").post(verifyUser, startAbhedya)

router.route("/superuser/").post(verifySuperUser, superUserController)
router.route("/superuser/login").post(superUserLogin)

// manage user routes
router.route("/superuser/users/").get(verifySuperUser, manageUsers)
router.route("/superuser/users/").delete(verifySuperUser, manageUsers)
router.route("/superuser/users/").post(verifySuperUser, manageUsers)
router.route("/superuser/users/").put(verifySuperUser, manageUsers)

// managing question routes
router.route("/superuser/levels/").get(verifySuperUser, manageQuestions)
router.route("/superuser/levels/").post(verifySuperUser, manageQuestions)
router.route("/superuser/levels/").put(verifySuperUser, manageQuestions)
router.route("/superuser/levels/").delete(verifySuperUser, manageQuestions)

router.route("/").get((req, res)=> {
  res.status(200).json({msg: "hitting user route."})
})

module.exports = router