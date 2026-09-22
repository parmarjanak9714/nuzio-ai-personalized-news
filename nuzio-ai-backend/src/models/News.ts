import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
  category: string;
  title: string;
  description: string;
  source: string;
}

const newsSchema = new Schema<INews>(
  {
    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "News",
  }
);

const News = mongoose.model<INews>("News", newsSchema);

export default News;