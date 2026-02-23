import '../styling/Login.css'
import Header from './Header'
import { Link } from "react-router-dom"
import AuthForm from './AuthForm'

function Login({ setIsAuthed }){


    return(
        
        <section className='page-container'>
            <Header />
                <AuthForm 
                    title = "Login"
                    submitLabel= "Login"
                    linkTo = "/signup"
                    linkText = " Don't have an account? Sign Up!"
                    apiPath = "login"
                    setIsAuthed={setIsAuthed}
                />
        </section>
        
    );

}

export default Login;