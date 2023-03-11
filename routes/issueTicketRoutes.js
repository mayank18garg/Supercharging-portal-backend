const express = require("express");
const router = express.Router();

const createTicket = require("../controllers/issueTicketController");


router.route("/").post(createTicket); 

module.exports = router;