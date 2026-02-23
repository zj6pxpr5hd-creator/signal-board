import '../styling/SignUp.css'
import AuthForm from './AuthForm';
import Header from './Header'

function SignUp({ setIsAuthed }){

    return(
        <section className='page-container'>
            <Header />
                <AuthForm 
                    title = "Sign Up"
                    submitLabel= "Sign Up"
                    linkTo = "/login"
                    linkText = "Already have an account? Log in!"
                    apiPath = "signup"
                    setIsAuthed={setIsAuthed}
                />
        </section>
    );

}

export default SignUp;

/*
general information

using onSubmit=" " in the form is more relaible than the button onClick=" " property
handling basic input errors inside the React component is more efficient tha doing it on the server because it stops useless api calls
*/