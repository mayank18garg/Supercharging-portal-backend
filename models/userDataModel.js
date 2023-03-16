const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema({
    userEmail:{
        type: String
    },
    contact:{
        type: Object
    },
    site:{
        type: Array
    }
}, {collection: 'supercharging_users'});

module.exports = mongoose.model("userData", userDataSchema);