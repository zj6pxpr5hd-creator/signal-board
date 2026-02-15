
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

// WRITE NEW ROUTES IN HERE


module.exports = app;