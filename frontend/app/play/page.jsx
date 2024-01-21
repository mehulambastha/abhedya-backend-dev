'use client'
import React, {useState, useEffect} from 'react';
import axios from 'axios';


const page = () => {
  const [questionSet, setQuestionSet] = useState(null)
  const [userAnswer, setUserAnswer] = useState(null)

  useEffect(() => {
    const fetchData = async() => {
        try {
          const response = await axios.post("http://localhost:5001/play/", {
            "token": localStorage.getItem("loginToken")
          });
          const questionReturnedFromBackend = response.data.question;
          setQuestionSet(questionReturnedFromBackend);
        } catch (error) {
          console.log("Macho error: ", error);
        } 
    }

    fetchData()
  }, []);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault()
    alert("Your answer: ", userAnswer)
    await axios.post("http://localhost:5001/play/submit", {
      "token": localStorage.getItem("loginToken"),
      "userAnswer": userAnswer
    })
      .then((response) => {
        alert("response is: ", response.success)
      })    
  }

  return (
    <div>
      {questionSet ? (
        <div>
          <p>Level {questionSet.level}<sup>{questionSet.questionId}</sup></p>
          <p> {questionSet.questionTitle}</p>
          <p>{questionSet.questionBody}</p>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
      <input type='text' placeholder='your answer...' className='p-2 m-4 border-2 border-black text-black bg-gray-100' 
      onChange={(e)=>{
        setUserAnswer(e.target.value)
      }}/>
      <button onClick={handleAnswerSubmit} className='bg-gray-200 p-1 m-4 rounded-xl border01 border-black'>Submit</button>
    </div>
  )
}

export default page
