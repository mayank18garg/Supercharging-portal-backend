const asyncHandler = require("express-async-handler");
const sessionData = require("../models/sessionModel");

const getSessionDatas = asyncHandler(async (req, res) => {
    const data = await sessionData.find().limit(10);
    res.status(200).json(data);
});


const getSessionData = asyncHandler(async (req, res) => {
    
    // const {start_date, end_date, trt_id} = req.params.;
    // console.log(req.query);
    const trt_id = parseInt(req.query.trt_id);
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    // console.log(typeof start_date, start_date);
    // console.log(typeof end_date, end_date);
    // console.log(typeof trt_id, trt_id);
    
    // Todo Check date format too
    if(!start_date || !end_date){
        res.status(400);
        throw new Error("Start_date and End_date are mandatory");
    }
    
    const data = await sessionData.aggregate([
        {
            "$match":{
                "trt_id": trt_id,
                "charge_date":{
                    "$gte": start_date,
                    "$lte": end_date
                }
            }
        },
        {
            "$addFields":{
                "charge_date":{ "$toDate" : "$charge_date" },
                "min_charge_date":{ "$toDate":"$min_charge_date" }
            }
        },
        {
            "$addFields":{
                "week_bin_charge_date":{
                    "$dateTrunc":{
                        "date": "$charge_date",
                        "unit" : "week"
                    }
                },
                "week_bin_min_charge_date":{
                    "$dateTrunc":{
                        "date": "$min_charge_date",
                        "unit": "week"
                    }
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "vehicle_id": "$vehicle_id",
                    "week": "$week_bin_charge_date"
                },
                "week_bin_min_charge_date" : { "$first" : "$week_bin_min_charge_date"}
            }
        },
        {
            "$group": {
                "_id" : {
                    "week" : "$_id.week"
                },
                "new_user" : {"$sum" : {"$cond" : { "if" : {"$eq": ["$_id.week", "$week_bin_min_charge_date"]}, "then":1, "else":0  }} },
                "distinct_user" : { "$sum" : 1}
            }
        },
        {
            "$project": {
                "_id" : 0,
                "week" : { "$dateToString" : {"date": "$_id.week", "format": "%Y-%m-%d"}},
                "new_user" : 1,
                "distinct_user" : 1
            }
        },
        {
            "$sort": { "week": 1 }
        }
    ]);
    

    let current_date = new Date(start_date);
    let ends_date = new Date(end_date);
    let i = 0;
    const ans = [];

    while( current_date <= ends_date){
        let date = current_date.toISOString().split('T')[0];

        if(i < data.length && date === data[i].week){
            ans.push({"new_user" : data[i].new_user, "returning_user" : data[i].distinct_user - data[i].new_user, "week" : date});
            i++;
        }
        else ans.push({"new_user" : 0, "returning_user" : 0, "week" : date});
        
        current_date.setDate(current_date.getDate() + 7);
    }

    // if(!data || Object.keys(data).length === 0){
    //     res.status(404);
    //     throw new Error("Session_data not found");
    // }
    res.status(200).json(ans);
});


module.exports = { getSessionDatas, getSessionData };