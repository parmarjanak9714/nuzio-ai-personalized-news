import { Request, Response } from "express";
import User from "../models/User";
import News from "../models/News";

interface AuthRequest extends Request {
  userId?: string;
}

export const getPersonalizedNews = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
const interests = user.interests || [];

console.log("USER INTERESTS:", interests);

const allNews = await News.find();

console.log("ALL NEWS:", allNews);

const news = await News.find({
  category: { $in: interests },
});

console.log("MATCHING NEWS:", news);

    res.json({
      message: "Personalized news fetched successfully",
      news,
    });
  } catch (error) {
    console.error("Get personalized news error:", error);

    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
};