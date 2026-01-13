import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.js"
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",authMiddleware,logoutUser);
 export default router;