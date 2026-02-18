const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;


/*
This file allows connecton with the database through a pool that keeps connection active so that 
the app can perform multiple queries after a single handshake
*/