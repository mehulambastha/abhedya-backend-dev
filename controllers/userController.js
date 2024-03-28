const nodemailer = require('nodemailer');
const expressAsync = require('express-async-handler')
const User = require('../modals/userModal');
const CryptoJS = require('crypto-js');
const base64url = require('base64url');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Queue = require('bull')

const superUserController = expressAsync(async (req, res) => {
  console.log("superUserContrller called.")
  const {superusername, supassword} = res.locals.superuserData
  console.log(`name: ${superusername}\npswd: ${supassword}`)
  res.status(200)
})

// loggin in superuser
const superUserLogin = expressAsync(async (req, res) => {
  console.log("login module called.")
  const { superusername, supassword } = req.body

  console.log("recieved: ", superusername, supassword)
  const superUserinDb = await User.findOne({type: 0, username: superusername}).lean()

  if (superUserinDb) {
    console.log("superUserFound")
    
    if (await bcrypt.compare(supassword, superUserinDb.password)) {  
      console.log("password verified\nReturning JWT token...\n", superusername, supassword) 
      
      const loginToken = jwt.sign({
        superuser: true,
        username: superusername,
        password: supassword
      }, process.env.SECRET)
      
      res.status(200).send(loginToken)
      console.log("returned JWT token. User verified.")
    }else{
      console.log("wrong password")
      res.status(401).send("Wrong password!")
    }

  } else {
    console.log("super user not found")
    res.status(404).send("Super user not found")
  }
})

// managing users for the superuser profile
const manageUsers = expressAsync(async (req, res) => {

  let uniqueIdentifier;

  switch (req.method) {
    case 'GET':
      const users = await User.find()
      console.log("all users are\n", users)
      res.status(200).json({users: users})
      break
    case 'PUT': 
      if (req.body.uniqueIdentifier){
        uniqueIdentifier = req.body.uniqueIdentifier
        const {objectifiedData} = req.body
        console.log("the updated user you sent is this: ", uniqueIdentifier, objectifiedData)

        // finding and replacing the data
        const existingUser = await User.findOne({username: uniqueIdentifier})
        console.log("existingUser", existingUser)
        const updatedUser = await User.findByIdAndUpdate(existingUser._id, objectifiedData, {new: true})
        console.log('updated ', updatedUser)
        res.status(200).send(`updated user: ${updatedUser}`)
      }
      break
    case "DELETE":
      console.log("entered deletion module")
      if (req.body.uniqueIdentifier){
        uniqueIdentifier = req.body.uniqueIdentifier
        console.log("found identifier: ", uniqueIdentifier)
        console.log("The user to delete is: ", uniqueIdentifier)
        const user = await User.findOne({username: uniqueIdentifier})
        const deletedUser = await User.findByIdAndDelete(user._id)
        res.status(200).send(`The user to delete is ${user}`)
      } else {
        console.log("wtf bhai data hi nahi aaya")
      }
      break
    case 'POST':
      const {newUserToAdd} = req.body
      console.log("Th enew user to add is: ", newUserToAdd)
      res.status(200).send(`The new user to add is:  ${newUserToAdd}`)
      break
    default:
      res.status(400).send(`Invalid request type`)
  }
  console.log("Exiting managing users...")
})

const registerUser = expressAsync(async (req, res) => {
  console.log("register user called")
  const {username, email, firstName, lastName} = req.body    

  const emailRegex = (emailToTest) => {
    // Regular expression pattern for the specified format
    const pattern = /^[0-9]{2}[a-zA-Z]{3}[0-9]{3}@nith\.ac\.in$/;

    // Test the email against the pattern
    return pattern.test(emailToTest);
  }

  if (!emailRegex(email)) {
    res.status(422).json({err: 'enter college email'})
  }

  const encryptText = (text, key) => {
    const encrypted = CryptoJS.AES.encrypt(text, key);
    return encrypted.toString();
  };

  // secret key
  const secretKey = 'prodyabhedya';
  // the encrypted string
  const encryptedLink = base64url(encryptText(username, secretKey))

  console.log('Data received: ', username, email, firstName, lastName)
  
  if (!username || !email) {
    res.status(400) 
  }

  let possibleUserByEmail = await User.findOne({email})
  let possibleUserByUsername = await User.findOne({username})

  if(!possibleUserByEmail && !possibleUserByUsername) {
    console.log("New user")
    const user = await User({username, email, firstName, lastName, loginLink: encryptedLink})
    console.log('user created')
    console.log({username, email, firstName, lastName})
    await user.save()
    res.status(200).json({msg: 'registered'})
    console.log(`User ${username} created successfully.`)
  }else if(possibleUserByUsername) {
    res.status(421).json({msg: "Username taken"})
  }else{
    console.log("Existing user.")
    res.status(400).json({msg: 'already exists'})
  }

})

const validateLinkAndLogin = expressAsync(async(req, res) => {
  console.log("login asked for user", req.params.encryptedUsername)
  const encryptedName = base64url.decode(req.params.encryptedUsername)
  const decryptText = (encryptedName, key) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedName, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const secretKey = "prodyabhedya"
  const decryptedName = decryptText(encryptedName, secretKey);
  console.log('Decrypted:', decryptedName);


  const user = await User.findOne({username: decryptedName})

  if (user) {
    console.log('user found')
    const loginToken = jwt.sign(
      {decryptedName}, 
      process.env.SECRET,
    )

    console.log('login token generated: ', loginToken)
    res.status(200).json({loginToken, startedAbhedya: user.startedAbhedya})
  } else {
    console.log("User not found")
    res.status(404).json({Error: `You haven't registered for Abhedya2k24 yet. Follow this link to register http://localhost:3000/user/register/`})
  }
})

const startAbhedya = expressAsync(async (req, res) => {
  const decodedData = res.locals.decoded //coming from the middleware. Contains username and iat.
  const username = decodedData.decryptedName
  const currentUser = await User.findOne({username})

  currentUser.startedAbhedya = true
  currentUser.prevQuestionTimeStamp = Date.now()
  
  try{
    await currentUser.save()
    res.status(200).json({msg: 'user started abhedya'})
  } catch {
    e => console.log(e)
  }

})

const userDetails = expressAsync(async(req, res) => {
  const decodedData = res.locals.decoded //coming from the middleware. Contains username and iat.
  const username = decodedData.decryptedName
  const currentUser = await User.findOne({username})
  
  if (currentUser) {
    res.status(200).json({startedAbhedya: currentUser.startedAbhedya})
  } else {
    res.status(404).json({Err: 'User not found in the database'})
  }
})


module.exports = {startAbhedya, registerUser, validateLinkAndLogin, superUserController, manageUsers, superUserLogin, userDetails}