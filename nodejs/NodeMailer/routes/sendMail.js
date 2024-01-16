var express = require("express");
var router = express.Router();
const sendMail = require("../controllers/sendMail.controller");

router.get("/", sendMail.index);
router.post("/", sendMail.handleSendMail);
router.get("/history", sendMail.history);
router.get("/history/:id", sendMail.historyDetail);

router.get("/tracking/:id", sendMail.handleTracking);

module.exports = router;
