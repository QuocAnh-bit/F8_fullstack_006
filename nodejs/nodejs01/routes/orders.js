import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";

// routing
// http get

router.get("/", userController.orderList);

router.get("/completed", userController.orderCompleted);

router.get("/cancel", userController.orderCancel);

export default router;
