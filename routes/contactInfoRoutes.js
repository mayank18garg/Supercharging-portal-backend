const express = require("express");
const router = express.Router();

// const {getAllUserData, getUserData} = require("../controllers/userDataController");
const {getContactInfo} = require("../controllers/userDataController");

// router.route("/").get(getSessionDatas);

router.route("/getContacts").get(getContactInfo); 
// router.route("/").get(getUserData);
module.exports = router;