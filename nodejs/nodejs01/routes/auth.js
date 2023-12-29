import express from "express";
import authController from "../controllers/auth.controller.js";
const router = express.Router();
// routing
// http get
router.get("/dang-nhap", authController.login);
router.post("/dang-nhap", authController.handleLogin);

export default router;
