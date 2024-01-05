const expressAsync = require('express-async-handler')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../modals/userModal')

const dynamicLinks = expressAsync(async(req, res) => {
  const name = req.params.username
  const email = req.params.emailshortened

  const user = await User.find({email})

  if (user) {
    const loginToken = jwt.sign(
      {name, email}, 
      process.env.SECRET,
      {expiresIn: '2m'}
    )
  
    res.cookie('token', loginToken)
    res.cookie('currentUser', {name, email})
  
    res.status(200).json({msg: `the params are ${name} and ${email}\nUser logged in successfully\nToken: ${loginToken}`})
  } else {
    console.log("User not found")
    res.status(404).json({Error: `You haven't registered for Abhedya2k24 yet. Follow this link to register http://localhost:5001/register/`})
  }
})

module.exports = {dynamicLinks}