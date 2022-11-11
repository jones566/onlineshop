import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  announcement1: String,
  announcement: String,
  link: String,
  Writer: String,
  date: String,
  image: {
    type: String,
    default: "",
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
