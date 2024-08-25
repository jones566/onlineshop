import Post from "../models/postModel.js";
import Order from "../models/ordersModel.js";
import Purchase from "../models/purchaseModel.js";
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
    res.render("ladies", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const housesRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("electronics", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const menRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("men", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const ladiesSunglassesRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("sunglass", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const ladiesSunglassesOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/ladiessunglass");
    }
    else{
      console.log(err);
    }
  });
};

const ladiesFootwearRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("footwear", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const ladiesFootwearOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/ladiesfootwear");
    }
    else{
      console.log(err);
    }
  });
};

const ladiesDressRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("dress", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const ladiesDressOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/ladiesdress");
    }
    else{
      console.log(err);
    }
  });
};

const ladiesBagsRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("bags", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const ladiesBagsOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/ladiesbags");
    }
    else{
      console.log(err);
    }
  });
};

const ladiesWatchRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("watches", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const ladiesWatchesOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/ladieswatches");
    }
    else{
      console.log(err);
    }
  });
};

const menWatchRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("menwatches", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const menWatchesOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/menwatches");
    }
    else{
      console.log(err);
    }
  });
};

const allOrderRouter = (req, res) => {
  Order.find({}, (err, posts) => {
    res.render("admin/orders", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const menDressRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("mendress", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const menDressOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/mendress");
    }
    else{
      console.log(err);
    }
  });
};

const menFootwearRouter = (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("menfootwear", { postContent: posts, 
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
};

const menFootwearOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/menfootwear");
    }
    else{
      console.log(err);
    }
  });
};

const allPurchaseRouter = (req, res) => {
  Purchase.find({}, (err, posts) => {
    res.render("admin/purchase", { productContent: posts, 
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

const deleteCartRouter = (req, res) => {
  const checkedItemId = req.body.remove;
        Order.findByIdAndRemove(checkedItemId, (err) => {
          if(!err){
             res.redirect("/cartpage");
            }
        });
}

const deletePurchaseRouter = (req, res) => {
  const removeItemId = req.body.remove;
        Purchase.findByIdAndRemove(removeItemId, (err) => {
          if(!err){ res.redirect("/admin/purchase");}
        });
}

const cartpage = (req, res) => {
  Order.find({ userId: req.user.id }, (err, posts) => {
    if (err) {
      console.error('Error fetching cart items:', err); // Log the error for debugging purposes
      return res.status(500).render('errorPage', {
        message: 'There was an error retrieving your cart items. Please login or register before accessing this page.',
        error: err,
        isAuthenticated: req.isAuthenticated(),
        user: req.user
      });
    }

    res.render('cartpage', {
      postContent: posts,
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  });
};


const checkoutpage = (req, res) => {
  Order.find({}, (err, posts) => {
    res.render("checkout", {
      postContent: posts,
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    });
  });
};

const uploadProductRouter = (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    stock: req.body.stockTitle,
    state: req.body.stateTitle,
    discount: req.body.discountTitle,
    oldprice: req.body.oldprice,
    popularity: req.body.popularity,
    content: req.body.postBody,
    announcement1: req.body.announcement1,
    announcement: req.body.announcement,
    productname: req.body.name,
    image: req.files['image'][0].filename
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
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
    
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

const uploadCartRouter = (req, res) => {
  const purchase = new Purchase({
    purchaseimage: req.body.purchimage,
    purchaseprice: req.body.price,
    purchasetotalprice: req.body.totalprice,
    purchaseslug: req.body.slug,
    customername: req.body.customer,
    size: req.body.size,
    quantity: req.body.quantity,
    color: req.body.color
    
  });

  purchase.save((err) => {
    if (!err) {
      res.redirect("/checkout");
    }
    else{
      console.log(err);
    }
  });
};

const apartmentOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image,
   
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/ladies");
    }
    else{
      console.log(err);
    }
  });
};

const houseOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image, 
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/electronics");
    }
    else{
      console.log(err);
    }
  });
};

const menOrderRouter = (req, res) => {
  const order = new Order({
    userId: req.user.id,
    ordertitle: req.body.catBody,
    orderprice: req.body.priceBody,
    customer: req.body.userBody,
    productname: req.body.name,
    productimage: req.body.image, 
  });

  order.save((err) => {
    if (!err) {
      res.redirect("/men");
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
      oldprice: post.oldprice,
      stock: post.stock,
      image: post.image,
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
         houseOrderRouter, cartpage, deleteCartRouter, uploadCartRouter, deletePurchaseRouter, 
         allPurchaseRouter, checkoutpage, menRouter, menOrderRouter, ladiesSunglassesRouter, 
         ladiesSunglassesOrderRouter, ladiesFootwearRouter, ladiesFootwearOrderRouter, ladiesDressRouter,
         ladiesDressOrderRouter, ladiesBagsRouter, ladiesBagsOrderRouter, ladiesWatchRouter, 
         ladiesWatchesOrderRouter, menDressRouter, menDressOrderRouter, menFootwearRouter, menFootwearOrderRouter,
         menWatchRouter, menWatchesOrderRouter};
