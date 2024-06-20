const express=require("express");
const router=express.Router();
const {freelancerRegister,getFreelancers, deleteFreelancer, updateFreelancer, getFreelancerById} = require("../controllers/FreelancerController");
router.route("/freelancer/new").post(freelancerRegister)
router.route("/freelancers").get(getFreelancers)
router.route("/freelancers/:id").delete(deleteFreelancer)
.put(updateFreelancer)
.get(getFreelancerById)
module.exports=router;