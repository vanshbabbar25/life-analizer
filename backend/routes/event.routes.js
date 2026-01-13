import express from "express";
import{createEvent,getEvent,deleteEvent} from "../controllers/event.controller.js"
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/",createEvent);
router.get("/",getEvent);
router.delete("/:id",deleteEvent);

export default router;