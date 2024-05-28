const catchAsyncError = require("../middleware/catchAsyncError")
const Auth =require("../models/userModel")

exports.registerUser =catchAsyncError(async (req, res, next) => {

    const {name,email,avatar,password}=req.body;

const user=await Auth.create({
    name,
    avatar,
    email,
    password

})

res.status(201).json({
    success:true,
    user
})

})