import express from "express";
import {
  savePreferences,
  getPreferences,
} from "../controllers/preferenceController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, savePreferences);

router.get("/", authMiddleware, getPreferences);

export default router;