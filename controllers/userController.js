const nodemailer = require('nodemailer');
const expressAsync = require('express-async-handler')
const User = require('../modals/userModal');
const CryptoJS = require('crypto-js');

const registerUser = expressAsync(async (req, res) => {
  console.log("register user called")
  const {username, email} = req.body

  console.log('Data received: ', username, email)
  
  if (!username || !email) {
    res.status(400)
    throw new Error("Incomplete data received.")
  }

  let possibleUser = await User.findOne({email})

  if(!possibleUser) {
    console.log("New user")
    const user = await User({username, email})
    console.log('user created')
    console.log({username, email})
    await user.save()
    console.log(`User ${username} created successfully.`)
  }else{
    console.log("Existing user.")
  }

  mailSendStatus = sendMail(username, email)

  mailSendStatus ? res.status(200).json({Success: "Registered and login link sent successfully through email"}) : res.status(400).json({Error: "Couldn't send mail. Registered however."})

})

const sendMail = (username, email) => {
  console.log('Data in sendMail function: ', username, email)
  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mehul.213amb@gmail.com',
      pass: 'kdad rjtn bcfs uica'
    }
  });

  const encryptText = (text, key) => {
    const encrypted = CryptoJS.AES.encrypt(text, key);
    return encrypted.toString();
  };

  // secret key
  const secretKey = 'prodyabhedya';
  // the encrypted string
  const encryptedLink = encryptText(username, secretKey);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Gaze Upward: Explore the Cosmic Canvas</title>
      <style>
          body {
              background: #0f202d;
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              display: flex;
              color: white;
              justify-content: center;
              align-items: center;
          }
  
          .container {
              background: #1e3449;
              border-radius: 10px;
              padding: 40px;
              max-width: 800px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
  
          .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
          }
  
          .title {
              font-size: 2.5em;
              text-align: center;
              color: #d5e4ff;
              text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
          }
  
          .images {
              display: flex;
              justify-content: space-around;
              align-items: center;
              width: 100%;
              border: 2px solid white;
          }
  
          .image-container {
              padding: 5px;
          }
  
          .image {
              width: 50px;
          }
  
          .content {
              line-height: 1.5;
              margin-bottom: 20px;
              color: #ffffff !important;
          }
  
          .box {
              background: #2d343c;
              border-radius: 5px;
              padding: 20px;
              margin-bottom: 20px;
          }
  
  
          .list {
              list-style: none;
              padding: 0;
              margin: 0;
          }
  
          .list-item {
              margin-bottom: 5px;
          }
  
          a:hover {
              background-color: #d5e4ff;
          }
  
          .button {
              background: linear-gradient(to right, #3a75ff, #3254db);
              border: none;
              border-radius: 5px;
              padding: 10px 20px;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
          }
  
          .button:hover {
              transition: all 0.3s ease-in-out;
              background: linear-gradient(to right, #3254db, #4a90e2);
          }
      </style>
  </head>
  <body>
  <div class="container">
      <div class="header">
          <h1 class="title">Abhedya: The Biggest Online Cryptic Hunt of NITH!</h1>
      </div>
      <div class="images">
          <div class="image-container">
              <img class="image" src="https://i.imgur.com/XoARgYd.png" alt="Constellation">
          </div>
          <div class="image-container">
              <img class="image" width="100px" src="https://i.imgur.com/DMlETCl.png" alt="Nebula">
          </div>
      </div>
      <div class="content">
          <h1>Hi! ${username}</h1>
          <p style="color: white;">You registered for Abhedya 2k24. \nTo login and play Abhedya, click the following button.</p>
          <a href="http://localhost:5001/login/${encryptedLink}">
            <button class="button">Play Now!</button>
          </a>
          <br><br>
          If the button doesn't work, copy and paste the following link in your browser window and hit enter.<br>
          http://localhost:5001/login/${encryptedLink}
      </div>
  </div>
</body>
</html>     
  `;

  // Define mail options
  const mailOptions = {
    from: 'mehul.213amb@gmail.com',
    to: email,
    subject: `User ${username} registered for Abhedya`,
    html: htmlContent
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error.message);
      return false
    }
    console.log('HTML Email sent: ' + info.response);
  });

  return true
}


module.exports = {registerUser}