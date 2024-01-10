const expressAsync = require('express-async-handler')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../modals/userModal')
const CryptoJS = require('crypto-js');

const dynamicLinks = expressAsync(async(req, res) => {
  const encryptedName = req.params.encryptedUsername
  const decryptText = (encryptedName, key) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedName, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const secretKey = "prodyabhedya"
  const decryptedName = decryptText(encryptedName, secretKey);
  console.log('Decrypted:', decryptedName);


  const user = await User.find({decryptedName})

  if (user) {
    const loginToken = jwt.sign(
      {decryptedName}, 
      process.env.SECRET,
      {expiresIn: '2m'}
    )
  
    res.cookie('token', loginToken)
    res.cookie('currentUser', {decryptedName})
  
    res.status(200).send(`<h1>the params are ${decryptedName}\nUser logged in successfully\nToken: ${loginToken}</h1>`)
  } else {
    console.log("User not found")
    res.status(404).send({Error: `You haven't registered for Abhedya2k24 yet. Follow this link to register http://localhost:5001/register/`})
  }
})

module.exports = {dynamicLinks}