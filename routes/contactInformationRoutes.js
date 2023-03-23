const express = require("express");
const router = express.Router();

// const {getAllUserData, getUserData} = require("../controllers/userDataController");
const {getContactInfo, updateContactInfo} = require("../controllers/contactInfoController");

// router.route("/").get(getSessionDatas);

router.route("/getContact").get(getContactInfo);
router.route("/updateContact").put(updateContactInfo);
// router.route("/").get(getUserData);
module.exports = router;