const express = require("express");
const router = express.Router();

const { getKpiData, getKpiDatas } = require("../controllers/kpiController");

// router.route("/").get(getKpiDatas);

router.route("/").get(getKpiData); 

module.exports = router;