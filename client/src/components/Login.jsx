import '../styling/Login.css'
import { useState } from 'react'
import Header from './Header'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Login({ setIsAuthed }){

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

        sendLogin(); 
    }

    //sends POST request
    const sendLogin = async () => {
        setLoading(true);
        const data = { // user data
            username: username,
            password: password
        }

        try{
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                const data = await response.json(); //reads error mesage from api response
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
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    return(
        
        <section className='page-container'>
            <Header />
            <main className="login-container">
                <h2 className="login-title">Login</h2>
                <form action="login" onSubmit={handleSubmit}>
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
                    {error && <div className='login-error'>
                        {error}
                    </div>}
                    <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
                    <Link to="/signup">don't have an account?</Link>
                </form>
            </main>
        </section>
        
    );

}

export default Login;