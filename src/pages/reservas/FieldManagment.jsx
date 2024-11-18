import React from 'react'
import UserProfile from './UserProfile'

const FieldManagment = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='sidebar h-[100%] bg-gray-900 flex flex-col'>
        <UserProfile />

        <button className='p-4 rounded-xl bg-gradient-to-r from-orange-dark to-orange-light'>
          Agregar
        </button>
      </div>


    </div>
  )
}

export default FieldManagment