const asyncHandler = require("express-async-handler");
const issueTicketData = require("../models/issueTicketModel");

const createTicket = asyncHandler(async (req, res) => {

    const {userEmail, title, type} = req.body;
    // console.log(userEmail, title, type);
    if(!userEmail || !title || !type){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const status = "In Progress";

    const data = await issueTicketData.create({
        userEmail,
        status,
        title,
        timestamp: new Date(),
        type
    });

    res.status(201).json(data);

    
});

const getissueTickets = asyncHandler(async (req, res) => {

    const userEmail = req.query.userEmail;

    const data = await issueTicketData.find({userEmail: userEmail});

    if(!data || Object.keys(data).length === 0){
        res.status(404);
        throw new Error("No Tickets found");
    }
    res.status(200).json(data);
});

module.exports = {createTicket, getissueTickets} ;