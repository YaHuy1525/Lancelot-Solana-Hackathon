const JobModel = require('../models/JobModel.js')

exports.getAllJobs =  async(req,res) => {
    try{
        const jobs = await JobModel.find()
        res.status(200).json(jobs)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}