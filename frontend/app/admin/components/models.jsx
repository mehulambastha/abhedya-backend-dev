import React from 'react'
import axios from 'axios'

// const fetchData = axios.get("http://localhost:5001/users/superuser/", {
//   headers: {

//   }
// }, (err, msg) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("message: ", msg)
//   }
// })

const models = (users) => {
  return (
    <div>
      {users ? (
        <div>
          Users
        </div>
      ) : (
        <div> 
          Questions  
        </div>
      )}
    </div>
  )
}

export default models
