const mongoose = require('mongoose');

const connectToDb = async () => {
  try{
    const connect = await mongoose.connect(process.env.CONN)
    console.log(`Connection established ${connect.connection.name} on ${connect.connection.port}`)
  }catch(e){
    console.log("error hogya: ", e)
  }
}

module.exports = connectToDb