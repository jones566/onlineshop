import Post from "../models/postModel.js";
import Order from "../models/ordersModel.js";
import multer from "multer";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage }).fields([
{
  name: "image"
},
{
  name: "image2"
},
{
  name: "image3"
},
{
  name: "image4" 
},
{
  name: "image5"
},
{
  name: "image6"
},
{
  name: "image7" 
},
{
  name: "image8"
},
{
  name: "image9"
}
])

const allProductsRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("admin/productlist", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const deleteProductRouter = (req, res) => {
  const checkedItemId = req.body.remove;
        Post.findByIdAndRemove(checkedItemId, (err) => {
          if(!err){res.redirect("/admin/productlist");}
        });
}

const homePageRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("index", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const apartmentsRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("apartments", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const housesRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("houses", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const allOrderRouter = (req, res) => {
  Order.find({}, (err, posts) => {
    res.render("admin/orders", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const deleteOrderRouter = (req, res) => {
  const checkedItemId = req.body.remove;
        Order.findByIdAndRemove(checkedItemId, (err) => {
          if(!err){ res.redirect("/admin/orders");}
        });
}

const uploadProductRouter = (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    announcement1: req.body.announcement1,
    announcement: req.body.announcement,
    productname: req.body.name,
    image: req.files['image'][0].filename,
    image2: req.files['image2'][0].filename,
    image3: req.files['image3'][0].filename,
    image4: req.files['image4'][0].filename,
    image5: req.files['image5'][0].filename,
    image6: req.files['image6'][0].filename,
    image7: req.files['image7'][0].filename,
    image8: req.files['image8'][0].filename,
    image9: req.files['image9'][0].filename
  });

  post.save((err) => {
    if (!err) {
      res.render("admin/addproduct");
    }
    else{
      console.log(err);
    }
  });
};

const uploadOrderRouter = (req, res) => {
  const order = new Order({
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/index");
    }
    else{
      console.log(err);
    }
  });
};

const apartmentOrderRouter = (req, res) => {
  const order = new Order({
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/apartments");
    }
    else{
      console.log(err);
    }
  });
};

const houseOrderRouter = (req, res) => {
  const order = new Order({
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/houses");
    }
    else{
      console.log(err);
    }
  });
};


const singleProductRouter = (req, res, next) => {
  const requestedPostId = req.params.postId;

  Post.findOne({_id:  requestedPostId}, (err, post) => {
    if (err) return next(err);
    res.render("product", {
      title: post.title,
      content: post.content,
      announcement1: post.announcement1,
      announcement: post.announcement,
      image: post.image,
      image2: post.image2,
      image3: post.image3,
      image4: post.image4,
      image5: post.image5,
      image6: post.image6,
      image7: post.image7,
      image8: post.image8,
      image9: post.image9,
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  });
};

const addProductsPageRouter = (req, res) => {
  res.render("admin/addproduct");
};
  
export default homePageRouter;
export { uploadProductRouter, singleProductRouter, addProductsPageRouter,upload, 
         uploadOrderRouter, allOrderRouter, allProductsRouter, deleteProductRouter,
         deleteOrderRouter, apartmentsRouter,housesRouter, apartmentOrderRouter, 
         houseOrderRouter};
