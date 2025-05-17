const FreelancerModel = require('../models/userModel')
exports.getAllFreelancers = async (req, res) => {
    try{
        const freelancers = await FreelancerModel.find()
        res.status(200).json(freelancers)
    }
    catch (err){
        res.status(500).json({message: err.message}) 
    }
}