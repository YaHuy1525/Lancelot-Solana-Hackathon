const mongoose = require("mongoose");

const reputationSchema = new mongoose.Schema(
  {
    fromWallet: {
      type: String,
      required: true,
      trim: true,
    },
    toWallet: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    jobId: {
      type: String,
      ref: "Job",
      required: true,
    },
    comment: {
      type: String,
      default: "",
    },
    transactionHash: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one rating per job per user
reputationSchema.index({ fromWallet: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("Reputation", reputationSchema);