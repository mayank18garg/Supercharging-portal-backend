const mongoose = require("mongoose");

const issueTicketSchema = mongoose.Schema({
    userEmail:{
        type: String
    },
    status:{
        type: String
    },
    title:{
        type: String
    },
    timestamp:{
        type: Date
    },
    type: {
        type: String
    }
}, {collection: 'issue-ticket'});

module.exports = mongoose.model("issueTicket", issueTicketSchema);