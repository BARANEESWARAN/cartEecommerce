const express = require('express');
const Freelancer = require('../models/FreelancerModel');
const catchAsyncError = require('../middleware/catchAsyncError');

// GET all Freelancers -/api/v1/client
exports.getFreelancers =catchAsyncError(async (req, res) => {
  
    const freelancers = await Freelancer.find();
    res.json({
        success:true,
        count: freelancers.length,
        freelancers
    });
});



// Create one Freelancer --/api/v1/client/new
exports.freelancerRegister= catchAsyncError(async (req, res) => {
  const freelancer = await Freelancer.create(req.body);

    res.status(201).json({
        success:true,
        freelancer
    });

});

// DELETE /api/v1/client/:id
exports.deleteFreelancer = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const freelancer = await Freelancer.findByIdAndDelete(id);
  
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer not found'
      });
    }
  
    res.json({
      success: true,
      message: 'Freelancer deleted successfully'
    });
  });

  
// PUT /api/v1/client/:id
exports.updateFreelancer = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Run Mongoose validators
    });
  
    if (!updatedFreelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer not found'
      });
    }
  
    res.json({
      success: true,
      updatedFreelancer
    });
  });


// GET /api/v1/client/:id
exports.getFreelancerById = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const freelancer = await Freelancer.findById(id);
  
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: 'Freelancer not found'
      });
    }
  
    res.json({
      success: true,
      freelancer
    });
  });
  






