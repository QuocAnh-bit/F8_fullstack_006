import express from "express";
import homeController from "../controllers/home.controller.js";
const router = express.Router();
// routing
// http get
router.get("/", homeController.index);

router.get("/san-pham", homeController.showProduct);

export default router;
