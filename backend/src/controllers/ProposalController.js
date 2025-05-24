const ProposalModel = require('../models/proposalModel');
const JobModel = require('../models/JobModel'); // To fetch job details like clientId

// Create a new proposal
exports.createProposal = async (req, res) => {
  try {
    const {
      jobId,          // Sent from frontend (original _id of the job)
      freelancerId,   // Sent from frontend (publicKey of the applicant)
      proposalText,   // From form
      estimatedTime,  // From form
      availability    // From form
    } = req.body;

    // Validate required fields
    if (!jobId || !freelancerId || !proposalText || !estimatedTime || !availability) {
      return res.status(400).json({ message: 'Missing required fields for proposal.' });
    }

    // Find the job to get the clientId
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    const clientId = job.client_id; // Assuming client_id is stored on the job model

    const newProposal = new ProposalModel({
      jobId,
      freelancerId,
      clientId, // Fetched from the job
      proposalText,
      estimatedTime,
      availability,
      // status defaults to 'pending'
    });

    const savedProposal = await newProposal.save();

    res.status(201).json({
      success: true,
      message: 'Proposal submitted successfully.',
      data: savedProposal
    });

  } catch (error) {
    console.error('Error creating proposal:', error);
    res.status(500).json({ message: 'Failed to submit proposal.', error: error.message });
  }
};

// TODO: Add other controller functions as needed (e.g., getProposalsByJob, getProposalsByUser, updateProposalStatus)
