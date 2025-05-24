const mongoose = require("mongoose");

// Delete existing model if it exists
if (mongoose.models.Proposal) {
  delete mongoose.connection.models["Proposal"];
}

const ProposalSchema = new mongoose.Schema({
  client_id: {
    type: String,
    ref: 'User',
    required: true
  },
  freelancer_id: {
    type: String,
    ref: 'User',
    default: null
  },
  job_id: {
    type: String,
    ref: 'Job',
    required: true
  },
  proposal_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  description: {
    type: String,
    required: true
  },
  estimated_time: {
    type: String,
    required: true
  },
  available_time: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

ProposalSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Add transform to convert Date fields to ISO string when toJSON is called
ProposalSchema.set('toJSON', {
  transform: function(doc, ret) {
    if (ret.created_at) {
      ret.created_at = ret.created_at.toISOString();
    }
    return ret;
  }
});

module.exports = mongoose.model("Proposal", ProposalSchema);
