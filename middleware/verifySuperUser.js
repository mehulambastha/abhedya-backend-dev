const expressAsync = require("express-async-handler")
const User = require("../modals/userModal")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const verifySuperUser = expressAsync(async ( req, res, next ) => {
  const token = req.headers.authorization
  console.log("verfying super user...")
  console.log("token recieved: ", token)
  if (token) {
    jwt.verify(token.split(' ')[1], process.env.SECRET, (err, decoded) => {
      if(!err) {
        console.log("decoded data is: ", decoded)
          res.status(200)
          next()
      }else{
        res.status(401).send("couldnt verify login token")
      }
    })
  }else{
    res.status(404).send("token not found")
  }
})

module.exports = {verifySuperUser}