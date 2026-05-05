import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.js"
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe
} from "../controllers/auth.controller.js";
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",authMiddleware,logoutUser);
router.get("/me", authMiddleware, getMe);
 export default router;