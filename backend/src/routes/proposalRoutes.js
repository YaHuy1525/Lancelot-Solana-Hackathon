const express = require("express");
const router = express.Router();
const proposalController = require("../controllers/ProposalController");
// const authMiddleware = require('../middleware/auth'); // Assuming auth middleware might be added later

// POST /api/proposals - Create a new proposal
// router.post("/", authMiddleware, proposalController.createProposal); // Example with auth
router.post("/", proposalController.createProposal);

// TODO: Add other routes as needed
// GET /api/proposals/job/:jobId - Get all proposals for a specific job
// GET /api/proposals/user/:userId - Get all proposals submitted by a user
// PUT /api/proposals/:proposalId - Update a proposal (e.g., status by client or freelancer)

module.exports = router;
