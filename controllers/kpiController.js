const asyncHandler = require("express-async-handler");
const kpiData = require("../models/kpiModel");

const getKpiDatas = asyncHandler(async (req, res) => {
    const data = await kpiData.find();
    res.status(200).json(data);
});

// const getKpiData = asyncHandler(async (req, res) => {
//     // console.log("The request body is:", req.body);
//     const {start_date, end_date} = req.body;
    
//     // Todo Check date format too
//     // if(!start_date || !end_date){
//     //     res.status(400);
//     //     throw new Error("Start_date and End_date are mandatory");
//     // }
//     console.log(req.params.trt_id);
//     const data = await kpiData.find({ 'trt_id': req.params.trt_id});
//     if(!data || Object.keys(data).length === 0){
//         res.status(404);
//         throw new Error("KPI_data not found");
//     }
//     res.status(200).json(data);
// });

const getKpiData = asyncHandler(async (req, res) => {
    
    const trt_id = parseInt(req.query.trt_id);
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    
    // Todo Check date format too
    if(!start_date || !end_date){
        res.status(400);
        throw new Error("Start_date and End_date are mandatory");
    }
    
    const data = await kpiData.aggregate([
        {
            "$match":{
                "trt_id": trt_id,
                "event_dt":{
                    "$gte": start_date,
                    "$lte": end_date
                }
            }
        },
        {
            $addFields: {
              hour: {
                $hour: {$toDate: "$datetime"}
              }
            }
        },
        {
            $bucket: {
                groupBy : "$hour",
                boundaries: [0,3,6,9,12,15,18,21,24],
                output:{
                    cummulative_sessions: { $sum: "$total_sessions" },
                    cummulative_kwhs : {$sum: "$total_kwhs"}
                }
                
            }
        },
        {
            $project:{
                hour: "$_id",
                cummulative_kwhs: 1,
                cummulative_sessions: 1,
                _id: 0
            }
        }
    ]);

    // console.log(data);

    let hourList = [0,3,6,9,12,15,18,21];
    let i = 0;
    const ans = [];
    for (hour in hourList){
        if(i < data.length && hourList[hour] === data[i].hour){
            ans.push({"hour": data[i].hour, "cummulative_kwhs": data[i].cummulative_kwhs, "cummulative_sessions": data[i].cummulative_sessions});
            i++;
        }
        else{
            ans.push({"hour": hourList[hour], "cummulative_kwhs": 0, "cummulative_sessions": 0});
        }
    }
    // if(!data || Object.keys(data).length === 0){
    //     res.status(404);
    //     throw new Error("KPI_data not found");
    // }
    res.status(200).json(ans);
});

module.exports = { getKpiDatas, getKpiData };