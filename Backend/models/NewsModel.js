import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      fileId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
export default News;
