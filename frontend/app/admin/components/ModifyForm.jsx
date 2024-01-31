'use client'
import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const ModifyhtmlForm = ({type, dataModal}) => {
  const router = useRouter()
  const [uniqueIdentifier, setUniqueIdentifier] = useState('')
  const [newValue, setNewValue] = useState('')
  
  // the source token of axios instance, required to close the instance when reloading the page
  const source = axios.CancelToken.source()
  
  // creating an instance for using axios
  const token = Cookies.get("token")
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/user/superuser/',
    headers: {
      'Authorization': "Bearer " + token
    },
    cancelToken: source.token
  })
  

  const handleClickApiRequests = async (dataModal, reqType) => {
    alert(`new value: ${newValue}\nIdentifier: ${uniqueIdentifier}`)
    
    let objectifiedData = {}
    if(newValue){
      objectifiedData = JSON.parse(newValue)
    }
    // checking the type of request
    switch (reqType) {
      case 'add':        
        // Checking the data model
        if (dataModal === 'users') {
          console.log(objectifiedData)
          await axios.post('http://localhost:5001/user/register/', objectifiedData, {headers: {'Authorization': 'Bearer ' + token}})
            .then((response) =>{
              response.status===200 ?
                (alert("registered!"), alert(response.data.msg))
                :
                (alert("maa chud gyi"))

                if (response.status===400) {
                  alert(response.data.error)
                } else if (response.status===404){
                  alert("nahi mila")
                }
            })
            .finally(()=> {
              router.refresh() 
            })

            
        } else if(dataModal === 'levels') {
          console.log(objectifiedData)

          try {
            // using in try catch block 
            await axiosInstance.post('/levels/', objectifiedData)
              .then((response) =>{
                response.status===200 ?
                  alert("added level!")
                  :
                  alert("maa chud gyi")

                  if (response.status===400) {
                    alert(response.data.error)
                  } else if (response.status===404){
                    alert("nahi mila")
                  }
              })
              .finally(()=> {
                router.refresh() 
              })
          } catch (error) {
            if (axios.isAxiosError(error)) {
              // The error is an AxiosError (specific to Axios)
              console.error('Axios Error:', error.message)
            } else {
              // Other types of errors
              console.error('Error:', error.message)   
            }
          }    
        }
        break
      case 'modify':
        // modifying data model


        // Checking the data model
        if (dataModal === 'users') {
          // console.log('identifier: ', uniqueIdentifier)
          // console.log('newValue: ', newValue)

          await axiosInstance.put("/users/", {uniqueIdentifier, objectifiedData})
            .then((response) => {
              alert(response.data)
            })
            .finally(()=>{
              alert("okay")
            })
        } else {
          await axiosInstance.put("/levels/", {uniqueIdentifier, objectifiedData})
            .then((response) => {
              alert(response.data)
            })
            .finally(()=>{
              alert("okay")
            })
        }
        break
      case 'delete':
        // Checking the data model
        if (dataModal === 'users') {
          alert("wanna delete??? mmmhmm")
          alert(`Unique Identifier: ${uniqueIdentifier}\nIts type is: ${typeof(uniqueIdentifier)}`)
          await axiosInstance.delete("/users/", {
            data: {
              uniqueIdentifier: uniqueIdentifier
            }
          })
            .then((response) => {
              alert("response aagya")
              alert(response.data)
            })
            .finally(()=>{
              alert("kardiya delete")
            })
        } else {
          alert("wanna delete question??? mmhmhmm")
          await axiosInstance.delete("/levels/", {
            data: {
              uniqueIdentifier: uniqueIdentifier
            }
          })
            .then((response)=>{
              alert(response.data)
            })
            .finally(()=>{
              alert("kardiya level delete")
            })
        }
        break
      default:
        alert("bc kya karra hai")
    }
  }



  if (type === 'modify') {
    return (
      <div className='flex self-end flex-col gap-4'>
        <label htmlFor="identifier" className='text-gray-500'>Unique Identifier</label>
        <input type="text" name='identifier' placeholder='unique identifier'
          onChange={(e) => setUniqueIdentifier(e.target.value)}
          value={uniqueIdentifier}
        />
        <label htmlFor="body" className='text-gray-500'>New value (as object)</label>
        <textarea type="text" name='body'
          onChange={(e) => setNewValue(e.target.value)}
          value={newValue}
        />
        <button className='bg-blue-500 text-white p-2 rounded-sm'
          onClick={()=>handleClickApiRequests(dataModal, type)}
        >Update</button>
      </div>
    )
  } else if (type === 'add') {
    return(
      <div className='flex self-end flex-col gap-4'>
        <label htmlFor="body" className='text-gray-500'>Add new (as object)</label>
        <textarea type="text" name='body'
          onChange={(e) => setNewValue(e.target.value)}
          value={newValue}
        />
        <button className='bg-blue-500 text-white p-2 rounded-sm'
          onClick={()=>handleClickApiRequests(dataModal, type)}
        >Add</button>
      </div>
    )
  } else if (type === 'delete') {
    return(
      <div className='flex self-end flex-col gap-4'>
        <label htmlFor="identifier" className='text-gray-500'>Unique Identifier</label>

        <input 
          type="text" 
          name='identifier' 
          placeholder='unique identifier to delete'
          onChange={(e) => setUniqueIdentifier(e.target.value)}
          value={uniqueIdentifier}
        />

        <button className='bg-blue-500 text-white p-2 rounded-sm'
          onClick={()=>handleClickApiRequests(dataModal, type)}
        >Delete</button>

      </div>
    )
  }
}

export default ModifyhtmlForm
