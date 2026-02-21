import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from 'react'
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import Footer from "./components/Footer"
import Account from './components/Account'
import Page from './components/PageLayout'



function App() {

  const [isAuthed, setIsAuthed] = useState(Boolean(localStorage.getItem("token"))); //checks if user is already logged in

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthed ? "/page" : "/signup"} replace />} />
        <Route path="/home" element={
          isAuthed ? 
           <Page > 
              <Home />
            </Page>
           : <Navigate to="/signup" replace />} />
        <Route path="/signup" element={isAuthed ? <Navigate to="/home" replace /> : <SignUp setIsAuthed={setIsAuthed}/>} />
        <Route path="/login" element={isAuthed ? <Navigate to="/home" replace /> : <Login setIsAuthed={setIsAuthed}/>} />
        <Route path="/account" element={
          isAuthed ? 
            <Page setIsAuthed={setIsAuthed}> 
              <Account />
            </Page>
            : <Navigate to="/signup" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
