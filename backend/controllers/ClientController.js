const express = require('express');
const Client = require('../models/ClientModel');
const catchAsyncError = require('../middleware/catchAsyncError');

// GET all clients -/api/v1/clients
exports.getClients =catchAsyncError(async (req, res) => {
  
    const clients = await Client.find();
    res.json({
        success:true,
        count: clients.length,
        clients
    });
});



// Create one client -/api/v1/client/new
exports.clientRegister = catchAsyncError(async (req, res) => {
  const client = await Client.create(req.body);

    res.status(201).json({
        success:true,
        client
    });

});

// Update client by ID - /api/v1/client/:id
exports.updateClient = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
        new: true, // To return the updated document
        runValidators: true, // To run Mongoose validators on the update operation
    });

    if (!updatedClient) {
        return res.status(404).json({
            success: false,
            message: 'Client not found',
        });
    }

    res.status(200).json({
        success: true,
        client: updatedClient,
    });
});

// Delete client by ID - /api/v1/client/:id
exports.deleteClient = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
        return res.status(404).json({
            success: false,
            message: 'Client not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Client deleted successfully',
    });
});

// Post client by ID - /api/v1/client/:id
exports.getClientById = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
        return res.status(404).json({
            success: false,
            message: 'Client not found',
        });
    }

    res.status(200).json({
        success: true,
        client,
    });
});







