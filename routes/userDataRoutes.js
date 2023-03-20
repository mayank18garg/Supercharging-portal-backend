const express = require("express");
const router = express.Router();

const {getAllUserData, getUserData, createUserData} = require("../controllers/userDataController");

// router.route("/").get(getSessionDatas);

router.route("/admin/getUsersData").get(getAllUserData);
router.route("/admin/createUserData").post(createUserData);
router.route("/").get(getUserData);
module.exports = router;