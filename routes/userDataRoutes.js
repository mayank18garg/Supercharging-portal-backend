const express = require("express");
const router = express.Router();

const getAllUserData = require("../controllers/userDataController");

// router.route("/").get(getSessionDatas);

router.route("/admin").get(getAllUserData); 

module.exports = router;