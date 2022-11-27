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
    res.render("news", { galleryContent: gallery });
  });
};

const addGalleryRouter = (req, res) => {
  res.render("add_gallery");
};

const uploadGalleryRouter = (req, res) => {
  const gallery = new Gallery({
    image2: req.file.filename,
  });

  gallery.save((err) => {
    if (!err) {
      res.redirect("/add_galleries");
    }
  });
};
export default galleriesRouter;
export { addGalleryRouter, uploadGalleryRouter, galleryUpload};
