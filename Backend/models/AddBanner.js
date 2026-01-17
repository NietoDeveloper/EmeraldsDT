import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  banners: {
    silderName: {
      type: String,
      enum: ["Slide 1", "Slide 2"],
    },
    fil
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
