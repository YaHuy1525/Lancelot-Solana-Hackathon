const express = require("express");
const router = express.Router();
const reputationController = require("../controllers/reputationController");

// Get all reputations
router.get("/", reputationController.getAllReputations);
//Get reputation by wallet
router.get("/:wallet", reputationController.getReputationByFreelancersWallet);

module.exports = router;