import Gallery from "../models/galleryModel.js";
import ejs from "ejs";
import multer from "multer";

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "galleries");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
  },
});

const galleryUpload = multer({ storage: galleryStorage }).single("gallery");

const galleriesRouter = (req, res) => {
  Gallery.find({}, (err, gallery) => {
    res.render("galleries", { galleryContent: gallery });
  });
};

const galleryRouter = (req, res, next) => {
  const requestedPostId = req.params.galleryId;

  Gallery.findOne({ _id: requestedPostId }, (err, gallery) => {
    if (err) return next(err);
    res.render("gallery", {
      image: gallery.image,
    });
  });
};

const addGalleryRouter = (req, res) => {
  res.render("add_gallery");
};

const uploadGalleryRouter = (req, res) => {
  const gallery = new Gallery({
    image: req.file.filename,
  });

  gallery.save((err) => {
    if (!err) {
      res.redirect("/galleries");
    }
  });
};
export default galleriesRouter;
export { galleryRouter, addGalleryRouter, uploadGalleryRouter, galleryUpload};
