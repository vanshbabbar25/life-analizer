import express from "express";
import authMiddleware from "../middleware/auth.js";
import {getInsights} from "../controllers/insight.controller.js";

const router = express.Router();
router.get("/",authMiddleware,getInsights);
export default router;