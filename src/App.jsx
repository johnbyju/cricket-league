import React from 'react'
import './index.css'
import { Route, Router, Routes } from 'react-router-dom'
import PlayerDetails from './components/UserForm'
import PreviewPage from './components/PreviewPage'


export default function App() {
  return (
    <>
   
      <Routes>
        <Route path="/" element={<PlayerDetails/>} />
        <Route path="/preview" element={<PreviewPage/>} />
      </Routes>
    
    {/* <PreviewPage/> */}
    </>
  )
}
