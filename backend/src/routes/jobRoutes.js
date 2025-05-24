const express = require("express");
const router = express.Router();
const jobController = require("../controllers/JobController");

// Get all jobs
router.get("/", jobController.getAllJobs);
// Route to delete all data (jobs + users) — call only intentionally
router.delete('/delete-all', jobController.deleteAllData);
//get all jobs by client id
router.get("/client/:clientId", jobController.getJobsByClient);


module.exports = router;
