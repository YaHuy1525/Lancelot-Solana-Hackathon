const express = require("express");
const router = express.Router();
const freelancerController = require("../controllers/userController");

// Get all freelancers
router.get("/", freelancerController.getAllFreelancers);

module.exports = router;

