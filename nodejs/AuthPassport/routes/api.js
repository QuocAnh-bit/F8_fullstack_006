var express = require("express");
var router = express.Router();
const userController = require("../controllers/api/user.controller");
const authController = require("../controllers/api/auth.controller");
const passport = require("passport");

router.get("/users", userController.index);
router.get("/users/:id", userController.find);
router.post("/users", userController.store);
router.put("/users/:id", userController.update);
router.patch("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.post("/auth/login", authController.login);
router.get("/auth/profile", authController.profile);

router.get("/auth/google", passport.authenticate("google"));
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // failureRedirect: "auth/login",

    successRedirect: "https://f8-fullstack-006-4mbb.vercel.app/",
  })
);

router.get("/auth/github", passport.authenticate("github"));
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    // failureRedirect: "auth/login",

    successRedirect: "https://f8-fullstack-006-4mbb.vercel.app/",
  })
);
router.get("/profile", authController.profileGG);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("https://f8-fullstack-006-4mbb.vercel.app/");
});

module.exports = router;
