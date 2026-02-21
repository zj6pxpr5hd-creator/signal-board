const express = require("express");
const router = express.Router();

const { create, recent, mine } = require("../controllers/signalController");

//endpoint to create new signal
router.post("/create", create); //define endpoint  (complete endpoint will be api/signal/create)

//endpoint to fetch recent signals
router.get("/recent", recent); //define endpoint  (complete endpoint will be api/signal/recent)

//endpoint to fetch a user signals
router.get("/mine", mine);//define endpoint  (complete endpoint will be api/signal/mine)

//endpoint to delete a signal
//router.delete("/delete", delete); 


module.exports = router;

