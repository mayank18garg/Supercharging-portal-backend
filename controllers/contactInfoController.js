const asyncHandler = require("express-async-handler");
const contactData = require("../models/contactInfoModel");
const transporter = require("./emailServer");

const getContactInfo = asyncHandler(async (req, res) => {
    const {trt_id, contactType} = req.query;

    const contactInfo = await contactData.find({trt_id: parseInt(trt_id), contactType: contactType}, {_id: 0, trt_id: 0, contactType: 0});
    // console.log(contactInfo);

    if(contactInfo.length > 0)
        res.status(200).json(contactInfo[0]);
    else
        res.status(200).json({
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            email: ""
        });

});

const updateContactInfo = asyncHandler(async (req, res) => {
    const {trt_id, contactType, formValue} = req.body;
    // console.log("Email:",userEmail, "Value:" ,formValue, typeof formValue);
    const data = await contactData.findOneAndUpdate({trt_id: trt_id, contactType: contactType}, {$set: formValue}, {projection:{_id: 0, trt_id: 0, contactType: 0},returnDocument: "after", upsert:true});
    // console.log(data);
    res.status(200).json(data);

    const emailText = JSON.stringify(req.body);

    const message = {
        from: "mgargtesla@gmail.com",
        to: "mgarg20@asu.edu",
        subject: `Update Contact Info`,
        text: emailText
    };
    // // const stringMessage = JSON.stringify(message);
    // // console.log(stringMessage);
    transporter.verify().then(console.log).catch(console.error);
    transporter.sendMail(message).then(info => {
        console.log({info});
      }).catch(console.error);



});

module.exports = {getContactInfo, updateContactInfo};