import { useState } from 'react'
import './App.css'
import Login from './Login'
import { Route, Routes } from "react-router-dom"
import Signup from './signup'
import Home from './Home'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
      
    </>
  )
}


export default App
