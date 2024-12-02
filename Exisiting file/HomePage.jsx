import React from 'react'
import Header from './Header'
import UserForm from './UserForm'
import Form from './UserFormExtend'

function HomePage() {
  return (
    <>
    <div className='absolute z-10'> 
    <Header />
    </div>

   <div className='relative'>
    <Form/>
   </div>
    </>
  )
}

export default HomePage