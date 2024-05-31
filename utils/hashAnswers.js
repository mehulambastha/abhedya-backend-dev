const CryptoJS = require('crypto-js');
const base64url = require('base64url');
// const fs = require('fs');
// const bcrypt = require('bcrypt');

// console.log('hi')

// let updatedJson = []
// console.log('initialized json, ' ,updatedJson)
//   fs.readFile('questions.json', 'utf-8', (err, file) => {
//   const data = JSON.parse(file)

//   console.log('reading')

//   data.forEach((question, index) => {
//     try {
//       const hashedAnswer = bcrypt.hashSync(question.correctAnswer.toString(), 10);
//       console.log("hashed answer: ", hashedAnswer);
  
//       const updatedQuestion = {
//         ...question,
//         correctAnswer: hashedAnswer
//       };
  
//       // console.log(updatedQuestion);
  
//       updatedJson.push(updatedQuestion);
//     } catch (error) {
//       // Handle errors if bcrypt.hash fails
//       console.error("Error hashing answer:", error);
//     }
//   })

//   console.log('updated json: ', updatedJson)
//   const formattedJson = JSON.stringify(updatedJson, null, 2)
  
//   try {
//       fs.writeFileSync('updatedData.json', formattedJson, 'utf8')
//       console.log('File written to')
//   } catch (e) {
//     console.log(e)
//   }
// })

const encryptText = (text, key) => {
  const encrypted = CryptoJS.AES.encrypt(text, key);
  return encrypted.toString();
};

// secret key
const secretKey = 'prodyabhedya';
// the encrypted string
const encryptedLink = base64url(encryptText("fakkati_babwe", secretKey))

console.log(encryptedLink)