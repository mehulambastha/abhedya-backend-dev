import React from 'react'

const ModifyForm = (params) => {
  if (params.type === 'modify') {
    return (
      <div className='flex self-end flex-col gap-4'>
        <label for="identifier" className='text-gray-500'>Unique Identifier</label>
        <input type="text" name='identifier' placeholder='unique identifier'/>
        <label for="body" className='text-gray-500'>New value (as object)</label>
        <textarea type="text" name='body'/>
        <button className='bg-blue-500 text-white p-2 rounded-sm'>Update</button>
      </div>
    )
  } else if (params.type === 'add') {
    return(
      <div className='flex self-end flex-col gap-4'>
        <label for="body" className='text-gray-500'>Add new (as object)</label>
        <textarea type="text" name='body'/>
        <button className='bg-blue-500 text-white p-2 rounded-sm'>Add</button>
      </div>
    )
  } else if (params.type === 'delete') {
    return(
      <div className='flex self-end flex-col gap-4'>
        <label for="identifier" className='text-gray-500'>Unique Identifier</label>
        <input type="text" name='identifier' placeholder='unique identifier to delete'/>
        <button className='bg-blue-500 text-white p-2 rounded-sm'>Delete</button>
      </div>
    )
  }
}

export default ModifyForm
