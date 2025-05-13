const ReputationModel = require('../models/ReputationModel.js')

exports.getAllReputations =  async(req,res) => {
    try{
        const reputations = await ReputationModel.find()
        res.status(200).json(jobs)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

exports.getReputationByFreelancersWallet =  async(req,res) => {
    try{
        const reputations = await ReputationModel.find({wallet: req.params.wallet}).populate('jobId', 'rating')
        res.status(200).json(jobs)
        if(reputations.length == 0 ){
            return res.status(404).json({message: 'Cant find Reputation'})
        }
        res.status(200).json(reputations);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}