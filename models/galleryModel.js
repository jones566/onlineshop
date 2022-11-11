import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
