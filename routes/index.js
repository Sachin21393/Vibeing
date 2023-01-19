const express = require("express");
const router = express.Router();
router.use("/signUp",require("./signUp/index"))
router.use("/analysis",require("./analysis/index"));

module.exports = router;