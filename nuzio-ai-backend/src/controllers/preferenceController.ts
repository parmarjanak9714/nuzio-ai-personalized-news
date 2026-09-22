import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
  userId?: string;
}

export const savePreferences = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { language, profession, interests, voice } = req.body;

    if (interests !== undefined && !Array.isArray(interests)) {
      return res.status(400).json({
        message: "Interests must be an array",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.language = language || user.language;
    user.profession = profession || user.profession;

    if (interests !== undefined) {
      user.interests = interests;
    }

    user.voice = voice || user.voice;

    await user.save();

    res.json({
      message: "Preferences saved successfully",
      preferences: {
        language: user.language,
        profession: user.profession,
        interests: user.interests,
        voice: user.voice,
      },
    });
  } catch (error) {
    console.error("Save preferences error:", error);

    res.status(500).json({
      message: "Failed to save preferences",
    });
  }
};

export const getPreferences = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.userId).select(
      "language profession interests voice"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      language: user.language,
      profession: user.profession,
      interests: user.interests,
      voice: user.voice,
    });
  } catch (error) {
    console.error("Get preferences error:", error);

    res.status(500).json({
      message: "Failed to get preferences",
    });
  }
};