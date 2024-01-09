var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");
router.get("/", authController.index);
router.get("/login", authController.login);
router.post("/login", authController.handleLogin);
router.get("/register", authController.register);
router.post("/register", authController.handleRegister);
router.post("/logout", authController.handleLogout);

module.exports = router;
