var express = require("express");
var router = express.Router();
const model = require("../models/index");
const User = model.User;
/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
