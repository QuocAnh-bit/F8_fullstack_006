var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");
router.get("/", authController.login);
router.post("/", authController.handleLogin);
router.get("/register", authController.register);
router.post("/register", authController.handleRegister);
router.post("/logout", authController.handleLogout);

module.exports = router;
