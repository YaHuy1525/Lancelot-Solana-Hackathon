const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Get all jobs
router.get("/", jobController.getAllJobs);
// Route to delete all data (jobs + users) — call only intentionally
router.delete('/delete-all', jobController.deleteAllData);

module.exports = router;
