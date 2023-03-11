const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    trt_id:{
        type: Number
    },
    vehicle_id:{
        type: String
    },
    charge_date:{
        type: String
    },
    min_charge_date:{
        type: String
    }
}, {collection: 'session_data'});

module.exports = mongoose.model("sessionData", sessionSchema);