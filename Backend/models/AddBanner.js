import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  banners: {
    silderName: {
      type: String,
      enum: ["Slide 1", "Slide 2"],
    },
    fileId: { type: String, required: true },
    url: { type: String, required: true },
    head: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    btn: {
      type: String,
      required: true,
    },
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
