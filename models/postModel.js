import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  announcement1: String,
  announcement: String,
  productname: String,
  image: {
    type: String,
    default: "",
  },
  image2: {
    type: String,
    default: "",
  },
  image3: {
    type: String,
    default: "",
  },
  image4: {
    type: String,
    default: "",
  },
  image5: {
    type: String,
    default: "",
  },
  image6: {
    type: String,
    default: "",
  },
  image7: {
    type: String,
    default: "",
  },
  image8: {
    type: String,
    default: "",
  },
  image9: {
    type: String,
    default: "",
  },
  order: String
});

const Post = mongoose.model("Post", postSchema);

export default Post;
