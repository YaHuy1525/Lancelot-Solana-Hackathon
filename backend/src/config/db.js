const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/userModel");
const Job = require("../models/JobModel");
const Proposal = require("../models/ProposalModel");
const Contract = require("../models/ContractModel");

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
        job_id: uuidv4(),
        title: "Build a Web3 DApp",
        description: "Need an expert to build a decentralized app on Solana.",
        responsibilities: "Design and implement smart contracts\nDevelop blockchain-based applications\nIntegrate with Solana network",
        requirements: "2+ years of blockchain development experience\nSolid understanding of Solana ecosystem\nExperience with Rust programming\nKnowledge of web3 technologies",
        required_skills: ['solana', 'rust', 'web3', 'blockchain'],
        budget: 1000,
        job_type: "Project-based",
        experience_level: "Expert",
        duration: "1-3 months",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: "open",
        created_at: new Date(),
      });

      await job.save();
      console.log("Job seeded successfully.");
    } else {
      console.log("Jobs already exist. Skipping job seeding.");
    }

    // Seed Proposals
    const proposalCount = await Proposal.countDocuments();
    if (proposalCount === 0) {
      console.log("No proposals found. Seeding proposals...");

      const job = await Job.findOne();
      const freelancer = await User.findOne({ role: "freelancer" });

      if (!job || !freelancer) {
        console.error("Required job or freelancer not found. Cannot seed proposals.");
        return;
      }

      const proposal = new Proposal({
        freelancer_id: freelancer._id,
        job_id: job._id,
        proposal_id: uuidv4(),
        status: "pending",
        description: "I am excited to work on your Web3 DApp project. With my extensive experience in Solana development, I can deliver a high-quality solution within your timeline.",
        estimated_time: "2_months",
        available_time: "2_months",
        created_at: new Date(),
      });

      await proposal.save();
      console.log("Proposal seeded successfully.");
    } else {
      console.log("Proposals already exist. Skipping proposal seeding.");
    }

    const contractCount = await Contract.countDocuments();
    if (contractCount === 0) {
      console.log("No contracts found. Seeding contracts...");
      const job = await Job.findOne();
      const client = await User.findOne({ role: "client" });
      const freelancer = await User.findOne({ role: "freelancer" });
      const contract = new Contract({
        job_id: job._id,
        client_id: client._id,
        freelancer_id: freelancer._id,
        contract_id: uuidv4(),
        status: "pending",
        milestones: [
          {
            title: "Initial Setup",
            description: "Set up project structure and initial smart contracts",
            amount: 300,
            due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            status: "pending"
          },
          {
            title: "Core Features Implementation",
            description: "Implement main blockchain features",
            amount: 400,
            due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
            status: "pending"
          },
          {
            title: "Testing and Deployment",
            description: "Complete testing and deploy to mainnet",
            amount: 300,
            due_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
            status: "pending"
          }
        ],
        created_at: new Date(),
        accepted_at: new Date(),
        completed_at: null, // Will be set when contract is completed
        escrow_address: null // Will be set when contract is accepted
      });

      await contract.save();
      console.log("Contract seeded successfully.");
    } else {
      console.log("Contracts already exist. Skipping contract seeding.");
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;