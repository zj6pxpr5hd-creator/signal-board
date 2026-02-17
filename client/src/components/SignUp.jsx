import '../styling/SignUp.css'

function SignUp(){

    return(
        <section className="signup-container">
            <h2 className="signup-title">Sign Up</h2>
            <form action="signup">
                <label htmlFor="username">Username</label>
                <input type="text" id='username' placeholder='choose a unique username'/>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' placeholder='at least 8 characters'/>
                <button>Sign Up</button>
            </form>
        </section>
    );

}

export default SignUp;
