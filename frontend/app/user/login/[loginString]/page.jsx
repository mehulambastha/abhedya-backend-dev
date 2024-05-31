'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const page = () => {
  
  const router = useRouter()
  const params = useParams()
  console.log("loginHash recieved from url: ", params.loginString)
  let loginToken = ""
  const [seconds, setSeconds] = useState(5);
  const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect(()=> {
    const sendRequest = async () => {
      await axios.get(`http://localhost:5001/user/login/${params.loginString}`)
        .then((response) => {
          console.log("response recieved from login: ", response)
          loginToken = response.data.loginToken
          console.log("login token in : ", loginToken)

        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          localStorage.setItem('loginToken', loginToken)
        })
    }
    sendRequest()
  }, [axios, params])
    
    
    useEffect(() => {
      const countdownInterval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(countdownInterval);
            router.push('../../play/');
          }
          return prevSeconds - 1;
        });
      }, 1000);
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(countdownInterval);
    }, [router]); 

  return (
    <div>
          <h1>
            Logged in. <br /> Redirecting you in {`${seconds}`} seconds ...
          </h1>
    </div>
  )
}

export default page
