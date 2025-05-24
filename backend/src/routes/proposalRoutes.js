const express = require("express");
const router = express.Router();
const proposalController = require("../controllers/ProposalController");

// Get all proposals
router.get("/", proposalController.getAllProposals);
// Get user proposals
router.get("/user/:id", proposalController.getUserProposals);
// Delete proposal
router.delete("/:id", proposalController.deleteProposal);
// Update proposal
router.put("/:id", proposalController.updateProposal);

module.exports = router;
