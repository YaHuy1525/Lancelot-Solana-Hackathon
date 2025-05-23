const mongoose = require("mongoose");

// Delete existing model if it exists
if (mongoose.models.User) {
  delete mongoose.connection.models["User"];
}

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  wallet_address: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    default: ""
  },
  profile_image_url: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: 0
  },
  total_earnings: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    enum: ['client', 'freelancer', 'both'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);