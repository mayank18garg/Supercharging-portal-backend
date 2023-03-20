const asyncHandler = require("express-async-handler");
const issueTicketData = require("../models/issueTicketModel");


const transporter = require("./emailServer");
//   transporter.verify().then(console.log).catch(console.error);

const createTicket = asyncHandler(async (req, res) => {

    const {userEmail, title, type, trt_id, site_name} = req.body;
    console.log(req.body);
    console.log(typeof req.body);
    const emailText = JSON.stringify(req.body);
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
        type,
        trt_id,
        site_name
    });

    res.status(201).json(data);

    const message = {
        from: "mgargtesla@gmail.com",
        to: "mgarg20@asu.edu",
        subject: `Issue Ticket from ${userEmail}`,
        text: emailText
    };
    // const stringMessage = JSON.stringify(message);
    // console.log(stringMessage);
    transporter.verify().then(console.log).catch(console.error);
    transporter.sendMail(message).then(info => {
        console.log({info});
      }).catch(console.error);

    
});

const getissueTickets = asyncHandler(async (req, res) => {

    // const userEmail = req.query.userEmail;
    const trt_id = parseInt(req.query.trt_id);
    // console.log(typeof trt_id);
    const data = await issueTicketData.find({trt_id: trt_id});
    // if(!data || Object.keys(data).length === 0){
    //     res.status(404);
    //     throw new Error("No Tickets found");
    // }
    res.status(200).json(data);
});

module.exports = {createTicket, getissueTickets} ;