"use client"
import React, {useEffect, useState} from 'react'
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  let response = ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    alert(`clicked\n${username}\n${email}`)
    await axios.post("http://localhost:5001/user/register/", {
      username: username,
      email: email,
    }).then((response) => {
      alert(`response after registration: ${response}`)
      console.log(response)
      response = response 
    })
    .catch((err) => {
      console.log(err)
    })

  } 

  return (
    <div className="p-4">
      <h1>
        Test app for abhedya backend
      </h1>
      <form method='POST'>
        <label htmlFor="username">Username</label><br />
        <input 
          type="text" 
          name="username" 
          onChange={(e) => {
            setUsername(e.target.value)
          }} 
          placeholder="enter username" 
          className="border-2 border-black"
        /> <br />
        <label htmlFor="username">Email</label><br />
        <input
          type="text" 
          name="email" 
          placeholder="Your email ID" 
          className="border-2 border-black"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <br />
        <button type="submit" onClick={handleSubmit} className="my-5 p-2 text-black border-2 border-rose-400 bg-blue-100">Register</button>
      </form>
    </div>
  )
}

export default Register
