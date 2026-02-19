const express = require("express");
const router = express.Router();

const { create, recent, mine } = require("../controllers/signalController");

//endpoint to create new signal
router.post("/create", create); //define endpoint  (complete endpoint will be api/signal/create)

//endpoint to fetch recent signals
router.get("/recent", recent); //define endpoint  (complete endpoint will be api/signal/recent)

router.get("/mine", mine);

module.exports = router;

