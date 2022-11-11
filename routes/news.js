import Post from "../models/postModel.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const allNewsRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("index", { postContent: posts });
  });
};
const uploadNewsRouter = (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    announcement1: req.body.announcement1,
    announcement: req.body.announcement,
    link: req.body.link_source,
    Writer: req.body.writers_name,
    date: req.body.date_post,
    image: req.file.filename,
  });

  post.save((err) => {
    if (!err) {
      res.redirect("/index");
    }
  });
};

const singlePostRouter = (req, res, next) => {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, (err, post) => {
    if (err) return next(err);
    res.render("news", {
      title: post.title,
      content: post.content,
      announcement1: post.announcement1,
      announcement: post.announcement,
      link: post.link,
      Writer: post.Writer,
      date: post.date,
      image: post.image,
    });
  });
};

const addNewsPageRouter = (req, res) => {
  res.render("add_news");
};

export default allNewsRouter;
export { uploadNewsRouter, singlePostRouter, addNewsPageRouter, upload};
