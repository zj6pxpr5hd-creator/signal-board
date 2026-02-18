import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from 'react'
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"


function App() {

  const [isAuthed, setIsAuthed] = useState(Boolean(localStorage.getItem("token"))); //checks if user is already logged in

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthed ? "/home" : "/signup"} replace />} />
        <Route path="/home" element={isAuthed ? <Home setIsAuthed={setIsAuthed}/> : <Navigate to="/signup" replace />} />
        <Route path="/signup" element={isAuthed ? <Navigate to="/home" replace /> : <SignUp setIsAuthed={setIsAuthed}/>} />
        <Route path="/login" element={isAuthed ? <Navigate to="/home" replace /> : <Login setIsAuthed={setIsAuthed}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
