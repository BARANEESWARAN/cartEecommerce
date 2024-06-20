const mongoose = require("mongoose");
const validator = require("validator");

const FreelancerSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address"
    }
  },
  experience: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    required: true
  },
createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const Freelancer = mongoose.model('Freelancer', FreelancerSchema);

module.exports = Freelancer;