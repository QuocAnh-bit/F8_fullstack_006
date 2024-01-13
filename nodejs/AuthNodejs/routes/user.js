var express = require("express");
var router = express.Router();
const model = require("../models/index");
const User = model.User;
const userController = require("../controllers/user.controller");

/* GET users listing. */
router.get("/", userController.index);
router.post("/editName", userController.handleEditName);
router.post("/editPass", userController.handleEditPass);

module.exports = router;
