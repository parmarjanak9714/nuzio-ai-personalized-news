import express from "express";
import { getPersonalizedNews } from "../controllers/newsController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getPersonalizedNews);

export default router;