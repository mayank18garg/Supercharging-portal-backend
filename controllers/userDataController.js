const asyncHandler = require("express-async-handler");
const userData = require("../models/userDataModel");

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

const getContactInfo = asyncHandler(async (req, res) => {
    const userEmail = req.query.userEmail;
    const usersData = await userData.find({userEmail: userEmail}, {_id: 0, contact:1});
    if(usersData.length > 0)
        res.status(200).json(usersData[0]);
    else
        res.status(200).json({});

});

const updateContactInfo = asyncHandler(async (req, res) => {
    const {userEmail, formValue} = req.body;
    // console.log("Email:",userEmail, "Value:" ,formValue, typeof formValue);
    const data = await userData.findOneAndUpdate({userEmail: userEmail}, {contact: formValue}, {projection:{contact:1},returnDocument: "after"});
    console.log("Sanket",data);
    res.status(200).json(data.contact);


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
    console.log(data);
    if(data==null){
        res.status(404);
        throw new Error("data not found");
    }

    res.status(200).json(data.site);
})

module.exports = {getAllUserData, getUserData, getContactInfo, updateContactInfo, getSiteInfo, updateSiteInfo};