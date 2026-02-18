const bcrypt = require("bcryptjs");
//import database connection
//pool is the connection with the database (now this file has access to pool.query(...) which means send this SQL to PostgreSQL)
const pool = require("../db/db"); 

//function to create users (=signup)
//this function: recieves data, executes INSERT query, returns the created user
//it axpects the password already hashed
const createUser = async (username, hashedPassword) => {

    const result = await pool.query(    //db query
        "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username", //SQL insertion code; returns ONLY id and username (DO NOT RETURN PASSWORD)
        [username, hashedPassword]      //$1 = username; $2 = hashedPassword
    );
    return result.rows[0]; //returns the created user object
};

const findUserByUsername = async (username) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1", //SQL search code
        [username]
    );
    return result.rows[0];
};

//function to check if password is correct (=login)

const checkPassword = async (user, password) => {

    const Matches = await bcrypt.compare(password,user.password_hash);
    
    if(Matches){
        return user;
    }
    return null;
};

//exports
module.exports = {
    createUser,
    findUserByUsername,
    checkPassword
}

/*
This file is responsible to talking to the database about users
conceptually it's a translator between Javascript, SQL and PostgreSQL
*/