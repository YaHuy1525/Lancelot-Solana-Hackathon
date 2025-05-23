const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const Job = require("../models/jobModel");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed Users if none exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("No users found. Seeding users...");

      await User.insertMany([
        {
          _id: uuidv4(),
          wallet_address: "SoLana1111Client",
          username: "clientuser",
          email: "client@example.com",
          bio: "I'm a client looking for great freelancers!",
          profile_image_url: "https://example.com/client.png",
          rating: 4.8,
          total_earnings: 0,
          role: "client",
          created_at: new Date(),
        },
        {
          _id: uuidv4(),
          wallet_address: "SoLana2222Free",
          username: "freelanceruser",
          email: "freelancer@example.com",
          bio: "Skilled freelancer for your projects.",
          profile_image_url: "https://example.com/freelancer.png",
          rating: 4.9,
          total_earnings: 2000,
          role: "freelancer",
          created_at: new Date(),
        },
      ]);
      console.log("Users seeded successfully.");
    } else {
      console.log("Users already exist. Skipping user seeding.");
    }

    // Seed Jobs if none exist
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log("No jobs found. Seeding jobs...");

      // Fetch client and freelancer to get their _ids
      const client = await User.findOne({ role: "client" });
      const freelancer = await User.findOne({ role: "freelancer" });

      if (!client || !freelancer) {
        console.error("Required users (client or freelancer) not found. Cannot seed jobs.");
        return;
      }

      const job = new Job({
        client_id: client._id,
        freelancer_id: null, // Initially no freelancer is assigned
        title: "Build a Web3 DApp",
        description: "Need an expert to build a decentralized app on Solana.",
        budget_min: 500,
        budget_max: 1500,
        category: "Blockchain",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: "open",
        created_at: new Date(),
      });

      await job.save();
      console.log("Job seeded successfully.");
    } else {
      console.log("Jobs already exist. Skipping job seeding.");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;