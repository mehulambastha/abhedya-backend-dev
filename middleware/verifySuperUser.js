const expressAsync = require("express-async-handler")
const User = require("../modals/userModal")
const bcrypt = require("bcrypt")

const verifySuperUser = expressAsync(async ( req, res, next ) => {
  const { superusername, supassword } = req.body
  console.log("verfying super user...")

  console.log("recieved: ", superusername, supassword)
  const superUserinDb = await User.findOne({type: 0, username: superusername}).lean()

  if (superUserinDb) {
    console.log("superUserFound")
    
    if (await bcrypt.compare(supassword, superUserinDb.password)) {  

            console.log("password verified\n\nsaving data to res.locals", superusername, supassword)
            res.locals.superuserData = {superusername, supassword}
            console.log("saved. moving on... \n")
            res.status(200)
            next()
    }else{
      console.log("wrong password")
      res.status(401).send("Wrong password!")
    }

  } else {
    console.log("super user not found")
    res.status(404).send("Super user not found")
  }

})

module.exports = {verifySuperUser}