import '../styling/SignUp.css'
import { useState } from 'react'
import Header from './Header'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


function SignUp({ setIsAuthed }){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        // check username/password validity
        if(!username.trim()){
            setError("Invalid Username") //returns error if username is missing
            return;
        }
        if(!password || password.length<8){
            setError("Invalid Password"); //returns error if password is missing/too short
            return;
        }

        sendSignUp(); 
    }
    
    //sends POST request
    const sendSignUp = async () => {
        setLoading(true);
        const data = { //new user data
            username: username,
            password: password
        }

        try{
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                const data = await response.json(); //reades error mesage from api response
                throw new Error(data.message || `Server Error: ${response.status}`);//throws an error with message or general server error message
            }
            const result = await response.json();

            console.log("success: ", result); //FOR TESTING
            
            localStorage.setItem("token", result.token); //saves token in localStorage as a sign of being logged in
            setIsAuthed(true); //tells App.jsx (that manages routes) that user is logged in
            navigate("/home"); //go to home

        } catch (err) {
            setError(err.message);
            //FOR TESTING
            console.log("Error: ", err);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <Header />
            <section className="signup-container">
                <h2 className="signup-title">Sign Up</h2>
                <form action="signup" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username"
                        placeholder="choose a unique username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setError("");
                            }
                        }
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="at least 8 characters"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError("");
                            }
                        }
                    />
                    {error && <div className='signup-error'>
                        {error}
                    </div>}
                    <button type="submit" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
                    <Link to="/login">already have an account?</Link>
                </form>
            </section>
        </>
    );

}

export default SignUp;

/*
general information

using onSubmit=" " in the form is more relaible than the button onClick=" " property
handling basic input errors inside the React component is more efficient tha doing it on the server because it stops useless api calls
*/