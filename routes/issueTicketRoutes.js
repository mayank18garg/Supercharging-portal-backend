const express = require("express");
const router = express.Router();

const {createTicket, getissueTickets} = require("../controllers/issueTicketController");


router.route("/").post(createTicket); 
router.route("/").get(getissueTickets);

module.exports = router;