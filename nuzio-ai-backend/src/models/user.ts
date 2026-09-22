import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  language?: string;
  profession?: string;
  interests: string[];
  voice?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "English",
    },

    profession: {
      type: String,
      default: "",
    },

    interests: {
      type: [String],
      default: [],
    },

    voice: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;