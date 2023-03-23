const asyncHandler = require("express-async-handler");
const userData = require("../models/userDataModel");
const transporter = require("./emailServer");

const getAllUserData = asyncHandler(async (req, res) => {
    const usersData = await userData.find();
    let finalData = [];
    if(usersData){
        usersData.map((data) => {
            data.site.forEach(site => {
                finalData.push(
                    {
                        userEmail: data.userEmail,
                        userName: data.contact.firstName + " " + data.contact.lastName,
                        siteName: site.siteName,
                        siteAddress: site.siteAddress,
                        trt_id: site.trt_id
                    }
                )
            });
        })
    }


    res.status(200).json(finalData);
});

const getUserData = asyncHandler(async (req, res) => {
    const userEmail = req.query.userEmail;
    const usersData = await userData.find({userEmail: userEmail});
    let finalData = [];
    if(usersData){
        usersData.map((data) => {
            data.site.forEach(site => {
                finalData.push(
                    {
                        siteName: site.siteName,
                        siteAddress: site.siteAddress,
                        trt_id: site.trt_id
                    }
                )
            });
        })
    }


    res.status(200).json(finalData);
});





const getSiteInfo = asyncHandler(async (req, res) => {
    const userEmail = req.query.userEmail;
    const trt_id = parseInt(req.query.trt_id);
    const siteData = await userData.find({userEmail: userEmail}, {site: {$elemMatch: {trt_id:trt_id}}}, {_id: 0, site:1});
    if(siteData.length > 0 && siteData[0].site.length > 0)
        res.status(200).json(siteData[0].site[0]);
    else
        res.status(200).json({});
})

const updateSiteInfo = asyncHandler(async (req, res) => {
    const {userEmail, trt_id, formValue} = req.body;
    const data = await userData.findOneAndUpdate(
        {userEmail: userEmail, "site.trt_id": parseInt(trt_id)},
        {$set:{
            'site.$.siteName': formValue.siteName,
            'site.$.siteWebsite': formValue.siteWebsite,
            'site.$.siteAddress': formValue.siteAddress,
            'site.$.phone': formValue.phone
        }},
        {projection:{site:{$elemMatch: {trt_id: trt_id}}}, returnDocument: "after"}
    );
    if(data==null){
        res.status(404);
        throw new Error("data not found");
    }

    res.status(200).json(data.site);

    const emailText = JSON.stringify(formValue);
    const message = {
        from: "mgargtesla@gmail.com",
        to: "mgarg20@asu.edu",
        subject: `Update Site Info -- ${userEmail} ${trt_id}`,
        text: emailText
    };
    // const stringMessage = JSON.stringify(message);
    // console.log(stringMessage);
    transporter.verify().then(console.log).catch(console.error);
    transporter.sendMail(message).then(info => {
        console.log({info});
      }).catch(console.error);
})

const createUserData = asyncHandler(async (req, res) => {

    const {userEmail, contact, trtlist} = req.body;

    let sitearray = [];
    for(let i=0; i<trtlist.trt_id.length; i++){
        sitearray.push({
            trt_id: parseInt(trtlist.trt_id[i]),
            siteName: trtlist.siteName[i],
            siteWebsite: trtlist.siteWebsite[i],
            siteAddress: trtlist.siteAddress[i],
            phone: trtlist.phone[i]
        })
    }
    const dataSend = {
        userEmail,
        contact,
        site: sitearray
    }
    // console.log(dataSend);
    const data = await userData.updateOne({userEmail: req.body.userEmail}, {$setOnInsert: dataSend}, {upsert:true});

    res.status(201).json(data);


});



module.exports = {getAllUserData, getUserData, getSiteInfo, updateSiteInfo, createUserData};