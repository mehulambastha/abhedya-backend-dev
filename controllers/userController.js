const expressAsync = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/userModal');

const registerUser = expressAsync(async (req, res) => {
  console.log("register user called")
  const {username, email, password} = req.body

  console.log('Data received: ', username, email, password)
  
  if (!username || !password || !email) {
    res.status(400)
    throw new Error("Incomplete data received.")
  }

  let possibleUser = await User.findOne({email})

  if(possibleUser) {
    res.status(400)
    throw new Error("User already existss.")
  }else{
    console.log("New user")
  }

  console.log('out of ifelse')
  const salt = await bcrypt.genSalt(10)
  console.log('salt generated')
  const hashedPassword = await bcrypt.hash(password, salt)

  console.log("password hashed: ", hashedPassword)

  const user = await User({username, email, password: hashedPassword})
  console.log('user created')
  console.log({username, email, hashedPassword, password})
  await user.save()

  res.status(200).json({msg: `User ${username} created successfully.`})
})

const loginUser = expressAsync(async(req, res) => {
  const {email, password} = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Incomplete data!")
  }

  const user = await User.find({email})
  if(!user) {
    res.status(400)
    throw new Error("User doesn't exist, register first.")
  }

  await bcrypt.compare(password, user.password, () => {
    console.log('User found.')
    console.log(`You are ${user}.`)   
  }) 

  const payload = {
    email, 
    password
  }

  const token = await jwt.sign(payload, process.env.SECRET, {expiresIn: "1m"})
  console.log('token: ', token)

  res.cookie("jwtToken", token, {maxAge: 9000000})
  console.log("cookie stored")
  res.status(200).json({msg: `logged in. token is ${token}`})

})

module.exports = {registerUser, loginUser}