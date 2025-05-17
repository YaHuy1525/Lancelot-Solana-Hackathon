const mongoose = require("mongoose");

// Delete existing model if it exists
if (mongoose.models.Job) {
  delete mongoose.connection.models["Job"];
}

const JobSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  budget_min: {
    type: Number,
    required: true
  },
  budget_max: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'completed', 'cancelled'],
    default: 'open'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Add transform to convert Date fields to ISO string when toJSON is called
JobSchema.set('toJSON', {
  transform: function(doc, ret) {
    if (ret.created_at) {
      ret.created_at = ret.created_at.toISOString();
    }
    if (ret.deadline) {
      ret.deadline = ret.deadline.toISOString();
    }
    return ret;
  }
});

module.exports = mongoose.model("Job", JobSchema);
