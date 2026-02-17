import '../styling/Login.css'

function Login(){

    return(
        <div className="login-container">
            <h2>Login</h2>
            <form action="login">
                <label htmlFor="username">Username</label><br/>
                <input type="text" id='username'/>
                <label htmlFor="username">Password</label><br/>
                <input type="text" id='username'/>
            </form>
        </div>
    );

}

export default Login;