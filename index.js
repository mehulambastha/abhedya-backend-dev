const express = require('express');
const dotenv = require('dotenv');
const connection = require('./database/connection');
const cookieParser = require('cookie-parser');
const session = require("express-session")
const cors = require('cors');
const app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(cors());
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