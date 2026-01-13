import express from "express";
import authMiddleware from "../middleware/auth.js";
import {createOrUpdateOutcome, getMyOutcome, getLatestOutcome, deleteOutcome} from "../controllers/outcome.controller.js"

const router = express.Router();

router.use(authMiddleware)
router.post("/",createOrUpdateOutcome);
router.get("/",getMyOutcome);
router.get("/latest",getLatestOutcome);
router.delete("/:date",deleteOutcome);

export default router;