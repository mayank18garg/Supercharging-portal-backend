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

module.exports = createTicket ;