const express = require("express");
const router = express.Router();

const {getAllUserData, getUserData} = require("../controllers/userDataController");

// router.route("/").get(getSessionDatas);

router.route("/admin").get(getAllUserData); 
router.route("/").get(getUserData);
module.exports = router;