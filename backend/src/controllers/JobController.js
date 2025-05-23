const JobModel = require('../models/JobModel');
const UserModel = require('../models/userModel');


async function transformJob(job) {
  return {
    ...job.toObject(),
    created_at: job.created_at ? job.created_at.toLocaleString() : null,
    updated_at: job.updated_at ? job.updated_at.toLocaleString() : null,
    deadline: job.deadline ? job.deadline.toLocaleString() : null,
  };
}

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find();
    // Transform the jobs to convert Date objects to readable strings
    const transformedJobs = await Promise.all(jobs.map(transformJob));
    res.status(200).json(transformedJobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try{
    const job = await JobModel.findById(req.params.id);
    const transformedJob = await transformJob(job);
    res.status(200).json(transformedJob);
  }
  catch (err){
    res.status(500).json({message: err.message}) 
  }
}



exports.deleteAllData = async (req, res) => {
  try {
    // Warning: This deletes ALL jobs and ALL users!
    await JobModel.deleteMany({});
    await UserModel.deleteMany({});

    res.status(200).json({ message: "All jobs and users have been deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
