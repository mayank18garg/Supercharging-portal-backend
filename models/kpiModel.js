const mongoose = require("mongoose");

const kpiSchema = mongoose.Schema({
    datetime:{
        type: String
    },
    trt_id:{
        type: Number
    },
    total_sessions:{
        type: Number
    },
    total_kwhs:{
        type: Number
    },
    event_dt:{
        type: String
    }
}, {collection: 'metric_data'});

module.exports = mongoose.model("kpiData", kpiSchema);