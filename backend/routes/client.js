const express=require("express");
const router=express.Router();
const {clientRegister,getClients, updateClient, deleteClient, getClientById} = require("../controllers/ClientController");



router.route("/client/new").post(clientRegister)
router.route("/clients").get(getClients)

router.route('/client/:id')
    .put(updateClient)
    .delete(deleteClient)
    .get(getClientById);

module.exports=router;