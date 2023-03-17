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

module.exports = {getAllUserData, getUserData, getContactInfo};