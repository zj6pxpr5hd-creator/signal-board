const bcrypt = require("bcryptjs");
const { createUser, findUserByUsername, checkPassword } = require("../models/userModel.js"); //imports functions defined inside userModel.js for user creation, searching and checking password
const jwt = require("jsonwebtoken"); //include web token

const register = async (req, res) => { //req = request from frontend; res = response controller sends back
    
    //React will send something like:
    // {
    //   "username": "user1",
    //   "password": "123456"
    // }

    try {
        const { username, password } = req.body; //extracts username and password from the request body
        
        //1) check username/password validity
        if(!username.trim()){
            return res.status(400).json({ message: "Invalid Username" }); //returns error if username is missing
        }
        if(!password || password.length<8){
            return res.status(400).json({ message: "Invalid Password" }); //returns error if password is missing/too short
        }

        //2) checks if user already exists
        const existingUser = await findUserByUsername(username); //uses the findUserByUsername function defined in userModel.js to search for the user
        //if the user already exists sends back an error
        if(existingUser){
            return res.status(409).json({ message: "User already exists" }); // 409 = conflict
        }


        //the user is new
        //3) hashes password
        const hashedPassword = await bcrypt.hash(password, 10);

        //4) create the user
        const newUser = await createUser(username, hashedPassword); //uses the createUser function defined in userModel.js to insert the new user in the database

        //5) create random token
        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        //6) sends succesfull response
        res.status(201).json({ //sets status code of the response and its body as a success message and the user object
            message: "User created successfully",
            user: newUser,
            token: token,
        });

    }catch (error) {    //catches error
        console.error(error);
        res.status(500).json({ message: "Server error" }); // 500 = server error

    }
};

const login = async (req, res) => {

    //React will send something like:
    // {
    //   "username": "user1",
    //   "password": "123456"
    // }

    try{

        const { username, password } = req.body; //extracts username and password from the request body
        
        //1) check username/password validity
        if(!username.trim()){
            return res.status(400).json({ message: "Invalid Username" }); //returns error if username is missing
        }
        if(!password || password.length<8){
            return res.status(400).json({ message: "Invalid Password" }); //returns error if password is missing/too short
        }

        //2) checks if user already exists
        const existingUser = await findUserByUsername(username); //uses the findUserByUsername function defined in userModel.js to search for the user
        
        if(!existingUser){
            return res.status(409).json({ message: "User not registered" }); // 409 = conflict
        }

        const passwordCorrect = await checkPassword(existingUser, password);

        if(passwordCorrect){//password is correct

            // create random token
            const token = jwt.sign(
            { id: existingUser.id, username: existingUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

            res.status(201).json({ //sets status code of the response and its body as a success message
                message: "User Logged in",
                 token: token,
            });
        } else {
            res.status(400).json({ message:"Password is wrong "});
        }


    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error" }); // 500 = server error
    }

};

module.exports = { register, login };

/*
This is the brain of the operation 
it decides: 
what should happen when someone tries to sign up
in what order things happen
what response should be sent back

the controller receives the HTTP request from React, applies business logic (validation, hashing, etc),
calls the model to interact with the database, and sends back an HTTP response
*/
