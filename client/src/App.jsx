import { useState } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import HomePage from './components/HomePage'
import NavBar  from './components/NavBar'

function App() {
  

  return (
    <>      
      <NavBar  />
      <SignUp />
    </>
  )
}

export default App
