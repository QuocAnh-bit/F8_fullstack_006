var express = require("express");
var router = express.Router();
const shortenUrlsController = require("../controllers/shorten-urls");

router.get("/", shortenUrlsController.index);
router.post("/", shortenUrlsController.handleShorten);
router.get("/:shortId", shortenUrlsController.handleShortId);

module.exports = router;
