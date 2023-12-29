import express from "express";
import routerOrders from "./orders.js";
import userController from "../controllers/user.controller.js";
import rolMiddleware from "../middlewares/rol.middleware.js";

const router = express.Router();
// routing
// http get

router.get("/", userController.index);

router.get("/add", userController.add);

router.get("/edit/:id", userController.edit);

router.use("/orders", rolMiddleware, routerOrders);

export default router;
