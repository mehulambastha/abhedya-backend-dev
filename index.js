const express = require('express');
const dotenv = require('dotenv');
const connection = require('./database/connection');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config()
connection()

const PORT = process.env.PORT || 5002;

app.use("/", require("./routes/homeRoutes"))
app.use("/user/", require("./routes/userRoutes"))

app.listen(PORT, () =>{
  console.log('Listening on port: ', PORT)
});