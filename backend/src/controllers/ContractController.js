const JobModel = require('../models/JobModel');
const ContractModel = require('../models/ContractModel');
const PaymentModel = require('../models/PaymentModel');
const mongoose = require('mongoose');

ContractSchema.methods.getRemainingAmount = async function() {
    const Payment = PaymentModel;
    
    const paidPayments = await Payment.find({
      job_id: this.job_id,
      status: 'paid'
    });
    
    const totalPaid = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
    return this.agreed_budget - totalPaid;
  };
  

  const contract = await ContractModel.findById(contractId);
  const remaining = await contract.getRemainingAmount();