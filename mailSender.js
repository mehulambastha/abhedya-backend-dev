const User = require('./modals/userModal')

const getUser = async () => {
  const allUsers = await User.findAll()

  console.log("all users are: ", allUsers)
}

getUser()