const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    clientWallet: {
      type: String,
      required: true,
      trim: true,
    },
    freelancerWallet: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"],
      default: "open",
    },
    paymentConfirmed: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Job", jobSchema);