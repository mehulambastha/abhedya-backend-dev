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


  let tableData = []

  switch (params.dataType) {
    case 'users':
      for (const data of dataList) {
        if (data.type == 1) {
          tableData.push(
            <tr>
              <td className='p-2 border border-gray-600'>{dataList.indexOf(data) + 1}.</td>
              <td className='p-2 border border-gray-600'>{data.username}</td>
              <td className='p-2 border border-gray-600'>{data.currentLevelInt}</td>
            </tr>
          )
        }
      }
      break
    case 'levels':
      for (const data of dataList) {
          tableData.push(
            <tr className=''>
              <td className='p-2 border border-gray-600'>{data.level}</td>
              <td className='p-2 border border-gray-600'>{data.questionId}</td>
              <td className='p-2 border border-gray-600'>{data.questionTitle}</td>
              <td className='p-2 border border-gray-600'>{data.correctAnswer}</td>
            </tr>
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
                  <ModifyForm type='add' dataModal={params.dataType}/>
                )
              case 'modify':
                return(
                  <ModifyForm type='modify' dataModal={params.dataType}/>
                )
              case 'delete':
                return(
                  <ModifyForm type='delete' dataModal={params.dataType}/>
                )
              default:
                return(
                  <p>Nothing to do...</p>
                )
            }
          })()
        }
  
      </div>
      <table className='table-auto w-11/12 m-auto p-2 border border-gray-600 border-collapse'>
        <thead>
          <tr>
            <th className='p-2 border border-gray-600'>
              {(()=>{
              if(params.dataType === 'users'){ 
                return('S.no')
              }else{
                return('Level')
              }
              })()}
            </th>
            <th className='p-2 border border-gray-600'>
              {(()=>{
                if(params.dataType === 'users') {
                  return('Username')
                } else {
                  return('Question ID')
                }
              })()}
            </th>
            <th className='p-2 border border-gray-600'>
              {(()=>{
                if(params.dataType === 'users') {
                  return('Level')
                } else {
                  return('Question')
                }
              })()}
            </th>
            {params.dataType === 'levels' && <th className='p-2 border border-gray-600'>Correct Answer</th>}
          </tr>
        </thead>
        <tbody>
          {tableData}          
        </tbody>
      </table>
    </div>
  )

}

export default Model
