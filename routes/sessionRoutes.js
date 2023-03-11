const express = require("express");
const router = express.Router();

const {getSessionDatas, getSessionData} = require("../controllers/sessionController");

// router.route("/").get(getSessionDatas);

router.route("/").get(getSessionData); 

module.exports = router;