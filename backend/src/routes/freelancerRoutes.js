const express = require("express");
const router = express.Router();
const freelancerController = require("../controllers/freelancerController");

// Get all freelancers
router.get("/", freelancerController.getAllFreelancers);

module.exports = router;

