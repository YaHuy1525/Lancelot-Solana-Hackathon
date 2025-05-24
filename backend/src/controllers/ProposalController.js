const JobModel = require('../models/JobModel');
const ContractModel = require('../models/ContractModel');
const PaymentModel = require('../models/PaymentModel');
const ProposalModel = require('../models/proposalModel');

exports.getAllProposals = async (req, res) => {
    try {
        const proposals = await ProposalModel.find();
        res.status(200).json(proposals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProposalsForJob = async (req, res) => {
  try {
    const proposals = await Proposal.find({ job_id: req.params.jobId })
      .populate('freelancer_id', 'username email rating');
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports