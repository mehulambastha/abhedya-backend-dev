'use client'
import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'


const ModifyhtmlForm = ({type, dataModal}) => {
  const token = Cookies.get("token")
  const router = useRouter()
  const [uniqueIdentifier, setUniqueIdentifier] = useState('')
  const [newValue, setNewValue] = useState('')

  const headers = {
    Authorization: "Bearer " + token
  }

  const handleClickApiRequests = async (dataModal, reqType) => {
    const objectifiedData = JSON.parse(newValue)
    // checking the type of request
    switch (reqType) {
      case 'add':
        
        // Checking the data model
        if (dataModal === 'users') {
          
          console.log(objectifiedData)
          await axios.post('http://localhost:5001/user/register/', objectifiedData)
            .then((response) =>{
              response.status===200 ?
                (alert("registered!"), alert(response.data.msg))
                :
                (alert("maa chud gyi"))

                if (response.status===400) {
                  alert(response.data.error)
                }
            })
            .finally(()=> {
              router.refresh() 
            })

            
        } else if(dataModal === 'levels') {
          console.log(objectifiedData)
          await axios.post('http://localhost:5001/user/superuser/levels/', objectifiedData, {headers})
            .then((response) =>{
              response.status===200 ?
                (alert("added level!"), alert(response.data.success))
                :
                (alert("maa chud gyi"))

                if (response.status===400) {
                  alert(response.data.error)
                }
            })
            .finally(()=> {
              router.refresh() 
            })
          
        }
        break
      case 'modify':
        // Checking the data model
        if (dataModal === 'users') {
          alert("user modify")
        } else {
          alert("level modify")
        }
        break
      case 'delete':
        // Checking the data model
        if (dataModal === 'users') {
          alert("user delete")
        } else {
          alert("level delete")
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
