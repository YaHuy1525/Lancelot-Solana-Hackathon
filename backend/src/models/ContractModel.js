const mongoose = require("mongoose");

if (mongoose.models.Contract) {
  delete mongoose.connection.models["Contract"];
}

const ContractSchema = new mongoose.Schema({
  job_id: {
    type: String,
    ref: 'Job',
    required: true
  },
  client_id: {
    type: String,
    ref: 'User',
    required: true
  },
  freelancer_id: {
    type: String,
    ref: 'User',
    required: true
  },
  contract_address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'disputed'],
    default: 'pending'
  },
  terms: {
    type: String,
    required: true
  },
  payment_id: {
    type: String,
    ref: 'Payment'
  },
  milestones: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    amount: {
      type: Number,
      required: true
    },
    due_date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  },
});

ContractSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model("Contract", ContractSchema);
