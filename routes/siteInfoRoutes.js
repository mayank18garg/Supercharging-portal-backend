const express = require("express");
const router = express.Router();

const {getSiteInfo, updateSiteInfo} = require("../controllers/userDataController");


router.route("/getSite").get(getSiteInfo);
router.route("/updateSite").put(updateSiteInfo);


module.exports = router;