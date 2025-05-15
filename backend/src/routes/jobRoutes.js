const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");

// Get all jobs
router.get("/", jobController.getAllJobs);

module.exports = router;
