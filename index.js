const express = require('express');
const dotenv = require('dotenv');
const connection = require('./database/connection');
const cookieParser = require('cookie-parser');
const session = require("express-session")

const app = express();
app.use(cookieParser());
app.use(session({
  secret: "ABD2k24",
  resave: false,
  saveUninitialized: true
}))
app.use(express.json());
dotenv.config()
connection()

const PORT = process.env.PORT || 5002;


app.use("/user/", require("./routes/userRoutes"))
app.use("/play/", require("./routes/playRoute"))

app.listen(PORT, () =>{
  console.log('Listening on port: ', PORT)
});