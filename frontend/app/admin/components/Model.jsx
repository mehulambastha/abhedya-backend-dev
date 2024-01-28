import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import ModifyForm from './ModifyForm'

const Model = (params) => {
  const token = Cookies.get("token")
  const [dataList, setDataList] = useState([])
  const [userAction, setuserAction] = useState('')

  const headers = {
    Authorization: "Bearer " + token
  }
  
  useEffect(() => {
    console.log("dataType is: ", params.dataType)
    const fetchData = async () => {
      await axios.get(`http://localhost:5001/user/superuser/${params.dataType}/`, {headers})
      .then((response) => {
        console.log("response: ", response.data[params.dataType])
        setDataList(response.data[params.dataType])
      })
    }
    fetchData()
  }, [params.dataType])

  const handleUserAction = (action) => {
    setuserAction(action)
  }


  let something = []

  switch (params.dataType) {
    case 'users':
      for (const data of dataList) {
        if (data.type == 1) {
          something.push(
            <div className='flex flex-row items-center justify-around border-2 border-black w-11/12 mx-auto p-4 py-2 rounded-xl'>
              <span>{dataList.indexOf(data) + 1}.</span>
              <span>{data.username}</span>
            </div>
          )
        }
      }
      break
    case 'levels':
      for (const data of dataList) {
          something.push(
            <div className='flex flex-row items-center gap-4 justify-around border-2 border-black w-11/12 mx-auto p-4 py-2 rounded-xl'>
              <span>{data.level}.</span>
              <span>{data.questionId}</span>
              <div className='flex flex-col gap-1 w-1/2'>
                <span className='border-b-black border-2 pb-4'>{data.questionTitle}</span>
                <span>{data.questionBody}</span>
              </div>
              <span>{data.correctAnswer}</span>
            </div>
          )
      }
      break
    
  } 

  return(
    <div className="flex flex-col gap-6 w-full">
      <div className='w-full flex flex-row items-center'>
        <div className='flex gap-2 mx-4 self-start'>
          <button className='w-20 py-2 bg-green-400 rounded-xl' onClick={() => handleUserAction('add')}>Add</button>
          <button className='w-20 py-2 bg-orange-400 rounded-xl' onClick={() => handleUserAction('modify')}>Modify</button>
          <button className='w-20 py-2 bg-red-600 text-white rounded-xl' onClick={() => handleUserAction('delete')}>Delete</button>
          <button className='w-20 py-2 bg-gray-600 text-white rounded-xl' onClick={() => handleUserAction('')}>Cancel</button>

        </div>


        {/*  the form actions */}
        {
          (()=>{
            switch(userAction) {
              case 'add':
                return(
                  <ModifyForm type='add' />
                )
              case 'modify':
                return(
                  <ModifyForm type='modify' />
                )
              case 'delete':
                return(
                  <ModifyForm type='delete' />
                )
              default:
                return(
                  <p>Nothing to do...</p>
                )
            }
          })()
        }
      </div>
      {something}
    </div>
  )

}

export default Model
