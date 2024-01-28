'use client'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { headers } from 'next/headers';

const page = () => {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [userLoggedIn, setUserLoggedIn] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      const tokenInLocalStorage = localStorage.getItem("loginToken")
      
      // If user is logged in
      if (tokenInLocalStorage) {
        try {
          const response = await axios.post("http://localhost:5001/play/", {
              "token": localStorage.getItem("loginToken")
            }, 
            {
              headers: {
                "token": localStorage.getItem("loginToken")
              }
            }
          );

          if (response.status === 200){
            const questionReturnedFromBackend = response.data.question;
            setCurrentQuestion(questionReturnedFromBackend);
          } else {
            setUserLoggedIn(false)
          }
        } catch (error) {
          console.log("Macho error: ", error);
        } 
      }else{
        setUserLoggedIn(false)
      }
    }

    fetchData()
  }, []);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5001/play/submit", {
      "token": localStorage.getItem("loginToken"),
      "userAnswer": userAnswer
    })
    .then((response) => {
        setCurrentQuestion(null)
        if(response.status === 200) {
          alert("Correct Answer!")
          setCurrentQuestion(response.data)
        }else{
          alert("Incorrect! Try again.")
        }
      })  
      .catch((err) => {
        alert("Incorrect! Try again.")
        setUserAnswer("")
      })  
      setUserAnswer("")
    }

  const handleLogOut = async (e) => {
    e.preventDefault()
    localStorage.clear("loginToken")
    router.push("../")
  }

  useEffect(()=> {
    if(!userLoggedIn) {
        const redirectToLogin = setTimeout(() => {
          router.push("../")
        }, 3000)        
        return () => clearTimeout(redirectToLogin)
    }
  }, [router])

  return (
    <div>
      {userLoggedIn ? (
        <div>
          {currentQuestion ? (
              <div>
                <p>Level {currentQuestion.level}<sup>{currentQuestion.questionId}</sup></p>
                <p> {currentQuestion.questionTitle}</p>
                <p>{currentQuestion.questionBody}</p>
              </div>
            ) : (
              <p>Loading question...</p>
            )
          }
            <input type='text' placeholder='your answer...' className='p-2 m-4 border-2 border-black text-black bg-gray-100' 
            onChange={(e)=>{
              setUserAnswer(e.target.value)
            }}
            value={userAnswer}
            />
            <button onClick={handleAnswerSubmit} className='bg-gray-200 p-1 m-4 rounded-xl border01 border-black'>Submit</button>
            <button onClick={handleLogOut} className='fixed top-4 right-4 p-4 bg-red-400 text-white'>LogOut</button>
        </div>
      ) : (
        <div>
          Login First!
        </div>
      )}
  </div>
  )
}

export default page
