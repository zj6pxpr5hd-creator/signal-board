
const express = require('express');
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.json({message: "API working"});
});

//test
app.get('/test-db', async (req,res) => {
    try{
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    }catch (err){
        console.error(err);
        res.status(500).json({ error: 'database error '});
    }
});

// WRITE NEW ROUTES IN HERE


module.exports = app;