const express = require("express");
const router = express.Router(); //create a Router

const { register, login } = require("../controllers/authController"); //imports register function from authController.js
const { account } = require("../controllers/accountController");

router.post("/signup", register); //define the route
//this means: when someone makes a post request to /signup call register(req, res)

router.post("/login", login); //define the route
//this means: when someone makes a post request to /login call login(req, res)

router.get("/account", account);//define the route
//this means: when someone makes a get request to /account call account(req, res)

module.exports = router;

/*
this file connects the URL with the controller function
it only defines which function runs when a certain endpoint is hit
*/