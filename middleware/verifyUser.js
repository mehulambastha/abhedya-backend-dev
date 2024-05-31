const expressAsync = require("express-async-handler")
const jwt = require("jsonwebtoken")

const verifyUser = expressAsync(async(req, res, next) => {
  console.log("verifying user...")
  const {token} = req.body
  if (token) {
    console.log("token received: ", token)
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
      if(err){
        res.status(400).send("<h1>User not logged in</h1><h3>Go back to your gmail and click login click again</h3>")
      }else{
        console.log("JWT Verified successfully!")
        console.log("Decoded Data: ", decoded)
        console.log("verification completed. Moving on...")
        res.locals.decoded = decoded
        next()
      }
    })
  } else{
    res.status(401).json({AuthenticationError: "User not logged in"})
  }

  // If token recieved
})

module.exports = verifyUser