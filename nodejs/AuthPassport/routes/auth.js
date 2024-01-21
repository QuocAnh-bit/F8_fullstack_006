var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");
const passport = require("passport");

router.get("/login", authController.login);
router.post(
  "/login",
  authController.handleLogin,
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/",
  })
  //   (req, res) => {
  //     res.send("Ok");
  //   }
);
router.get("/register", authController.register);
router.post("/register", authController.handleRegister);
router.get("/forgot-password", authController.forgotPassword);
router.post("/forgot-password", authController.handleForgot);
router.get("/reset-password", authController.resetPassword);
router.post("/reset-password", authController.handleResetPassword);
router.get("/google/redirect", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "auth/login",
    failureFlash: true,
    successRedirect: "/",
  })
);
router.get("/logout", (req, res) => {
  req.logout(() => {});
  return res.redirect("/auth/login");
});

module.exports = router;
