import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  image2: {
    type: String,
    default: "",
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
