const ProposalModel = require('../models/ProposalModel');

exports.getAllProposals = async (req, res) => {
    try {
        const proposals = await ProposalModel.find();
        res.status(200).json(proposals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserProposals = async (req, res) => {
    try {
        const proposals = await ProposalModel.find({user_id: req.params.id});
        res.status(200).json(proposals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.postProposal = async(req, res) => {
    try{
        const{
            client_id,
            freelancer_id,
            job_id,
            proposal_id,
            status,
            description,
            estimated_time,
            available_time,
        } = req.body;
        const proposal = new ProposalModel({
            client_id,
            freelancer_id,
            job_id,
            proposal_id,
            status,
            description,
            estimated_time,
            available_time,
        });
        const newProposal = await proposal.save();
        res.status(201).json({
            success: true,
            message: 'Proposal created successfully',
            data: newProposal
        })
    }
    catch(err){
        res.status(500).json({message: err.message}) 
    }
}

exports.deleteProposal = async (req, res) => {
    try {
        const proposal = await ProposalModel.findByIdAndDelete(req.params.id);
        res.status(200).json(proposal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateProposal = async (req, res) => {
    try {
        const proposal = await ProposalModel.findById(req.params.id);
        if (!proposal) {
            return res.status(404).json({ message: 'Proposal not found' });
        }

        // Update proposal fields
        proposal.status = req.body.status || proposal.status;
        proposal.description = req.body.description || proposal.description;
        proposal.estimated_time = req.body.estimated_time || proposal.estimated_time;
        proposal.available_time = req.body.available_time || proposal.available_time;
        
        await proposal.save();
        
        res.status(200).json({
            success: true,
            message: 'Proposal updated successfully',
            data: proposal
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
