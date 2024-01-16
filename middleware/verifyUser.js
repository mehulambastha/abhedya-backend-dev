const expressAsync = require("express-async-handler")
const jwt = require("jsonwebtoken")

const verifyUser = expressAsync((req, res, next) => {
  let user = ''
  try{
    token = req.cookies.token
    console.log("loginToken found: ", token)
  }catch(e){
    console.log(e.message)
  }

  // If token recieved
  console.log("token received: ", token)
  jwt.verify(token, process.env.SECRET, (err, decoded)=>{
    if(err){
      res.status(400).send("<h1>User not authenticated</h1><h3>Go back to your gmail and click login click again</h3>")
      throw new Error(err)
    }else{
      console.log("JWT Verified successfully!")
      console.log("Decoded Data: ", decoded)
      console.log("verification completed. Moving on...")
      next()
    }
  })
})

module.exports = verifyUser