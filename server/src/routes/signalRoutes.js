const express = require("express");
const router = express.Router();

const { create, recent } = require("../controllers/signalController");

//endpoint to create new signal
router.post("/create", create); //define endpoint  (complete endpoint will be api/signal/create)

//endpoint to fetch recent signals
router.get("/recent", recent); //define endpoint  (complete endpoint will be api/signal/recent)


module.exports = router;

