const FreelancerModel = require('../models/FreelancerModel')
exports.getAllFreelancers = async (req, res) => {
    try{
        const freelancers = await FreelancerModel.find()
        res.status(200).json(freelancers)
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
}