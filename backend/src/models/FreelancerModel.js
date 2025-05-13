const mongoose = require("mongoose")

const FreelancerSchema = new mongoose.Schema({
    wallet: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.module("Freelancer", FreelancerSchema)