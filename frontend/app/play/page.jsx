'use client'
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const page = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState("")

  useEffect(() => {
    const fetchData = async() => {
        try {
          const response = await axios.post("http://localhost:5001/play/", {
            "token": localStorage.getItem("loginToken")
          });
          const questionReturnedFromBackend = response.data.question;
          setCurrentQuestion(questionReturnedFromBackend);
        } catch (error) {
          console.log("Macho error: ", error);
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
        setUserAnswer("")
        if(response.status === 200) {
          alert("Correct Answer!")
          setCurrentQuestion(response.data)
        }else{
          alert("Incorrect! Try again.")
        }
      })  
      .catch((err) => {
        alert("Fetching Error", err)
      })  
  }

  return (
    <div>
      {currentQuestion ? (
        <div>
          <p>Level {currentQuestion.level}<sup>{currentQuestion.questionId}</sup></p>
          <p> {currentQuestion.questionTitle}</p>
          <p>{currentQuestion.questionBody}</p>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
      <input type='text' placeholder='your answer...' className='p-2 m-4 border-2 border-black text-black bg-gray-100' 
      onChange={(e)=>{
        setUserAnswer(e.target.value)
      }}
      value={userAnswer}
      />
      <button onClick={handleAnswerSubmit} className='bg-gray-200 p-1 m-4 rounded-xl border01 border-black'>Submit</button>
    </div>
  )
}

export default page
