import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  stock: String,
  state: String,
  discount: String,
  oldprice: String,
  popularity: String,
  announcement1: String,
  announcement: String,
  productname: String,
  image: {
    type: String,
    default: "",
  },
  order: String
});

const Post = mongoose.model("Post", postSchema);

export default Post;