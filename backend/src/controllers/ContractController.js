const JobModel = require('../models/JobModel');
const ContractModel = require('../models/ContractModel');
const PaymentModel = require('../models/PaymentModel');

exports.getAllContracts = async (req, res) => {
  try{
    const contracts = ContractModel.find();
    res.status(200).json(contracts)
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

exports.getContractById = async (req, res) => {
  try{
    const contract = ContractModel.findById(req.params.id);
    res.status(200).json(contract)
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

exports.getUserContracts = async (req, res) => {
  try{
    const contracts = ContractModel.find({user_id: req.params.id});
    res.status(200).json(contracts)
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

exports.deleteContract = async (req, res) => {
  try{
    const contract = ContractModel.find({contract_id: req.params.id}).deleteOne()
    res.status(200).json(contract + 'has been deleted')
  }
  catch(err){
    res.status(500).json({message: err})
  }
}

// exporupdateContract = async (req, res) => {
//   try{
//     const contract = ContractModel.find({contract_id: req.params.id}).updateOne(req.body)
//     res.status(200).json(contract + 'has been updated')
//   }
//   catch(err){
//     res.status(500).json({message: err})
//   }
// }

module.exports = exports