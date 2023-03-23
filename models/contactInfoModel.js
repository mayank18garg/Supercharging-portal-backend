const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
    trt_id:{
        type: Number
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
    contactType:{
        type: String
    }
}, {collection: 'contact_information', versionKey: false});

module.exports = mongoose.model("contactData", userDataSchema);