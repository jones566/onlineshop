/*  ---------Project Info--------
            INTRODUCTION
  This is a real estate app where a user or a customer can buy or rent a property which includes houses and apartments.
  
            BODY
  The app works in such a way that a user can access it and look around through it even though the person might not be
  a registered member, but before a user can buy or rent a property the person must register or login first. Firstly,
  when a user visits the site, the buttons will be available for the user either buy or rent depending on the category
  of the property. The button is rendered non functional though the user has entered the site, it is only made functional
  once the user has registered or logged in. Also the user can login or register from any page of the app.
  
          CONCLUSION
  This is a single page real estate app which reduces the burden of the user having to navigate through many pages.        

*/

import mongoose from 'mongoose';  //This is a mongodb package for creating the schemas
import dotenv from 'dotenv';  //This line helps to keep the most important values private in the .env
import express from "express"; //This is the framework library
import bodyParser from "body-parser"; //Body parser helps to connect our name field to our backend
import session from "express-session"; // This is what stores the user session
import passport from "passport"; // passport is used to authenticate a user 
import passportLocalMongoose from "passport-local-mongoose"; // It is used in combination with passport to ensure use login
import _ from "lodash"; //lodash helps us to create a param which we can bind to our products so that we can view the individually




// This line imports various routes from the various models
import {uploadProductRouter, singleProductRouter, addProductsPageRouter, upload, 
       uploadOrderRouter, allOrderRouter, allProductsRouter, deleteProductRouter, 
       deleteOrderRouter, apartmentsRouter, housesRouter, apartmentOrderRouter, 
       houseOrderRouter} 
       from './routes/product.js';

import homePageRouter from "./routes/product.js";

import loginRouter, { addUserRouter } from "./routes/authentication.js";
import {registerRouter}  from "./routes/authentication.js";
import footerRouter from "./routes/footer.js";

import sidenavRouter from "./routes/sidenav.js";
import topheaderRouter from "./routes/topheader.js";
//  end of imports




dotenv.config();        
const app = express();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(express.static("images"))
app.use(express.static("galleries"))
app.use(express.json());

//This uses a session to store user info when logged in, the session expires when the user logs out
app.use(session({
  secret: "ThisisOurLittleSecret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
       
mongoose.connect("mongodb://127.0.0.1:27017/realestateDB");  //This connects you to Mongo db atlas

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  repassword: String,
  mobile: String,
  address1: String,
  address2: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id,  (err, user) =>{
    done(err, user);
  });
});

//The below lines of code are the APIs Routes

app.get("/admin/indexes",  (req, res) => {
  User.find({}, (err, posts) => {
    res.render("admin/indexes", { postContent: posts,
      isAuthenticated: req.isAuthenticated(),
      user: req.user 
       });
  });
}); //This is the admin dashboard route;

app.get("/admin/sidenav", sidenavRouter);

app.get("/admin/topheader", topheaderRouter);
  
app.get("/admin/footer",  footerRouter);



app.get("/admin/edituser", (req, res) => {
  User.find({}, (err, posts) => {
    if (err) return next(err);
    res.render("admin/edituser", {
      postContent: posts,
      isAuthenticated: req.isAuthenticated(),
      user: req.user });
  });
})

app.get("/admin/productlist", allProductsRouter);

app.get("/admin/orders", allOrderRouter);

app.post("/deleteOrder", deleteOrderRouter);

app.get("/admin/adduser", addUserRouter);

app.post("/admin/adduser",  (req, res) => {
  User.register(
    { username: req.body.username,
      password: req.body.password, 
      email: req.body.email, 
      mobile: req.body.mobile, 
      address1: req.body.address1, 
      address2: req.body.address2
    },
      req.body.password,
    (err, user) => {
      if (err) {
        res.send(JSON.stringify(err.message));
       } else {
       
        passport.authenticate("local")(req, res, () => {
          res.redirect("/admin/adduser");
        });
      }
    }
  );
});


app.get("/admin/manageuser", (req, res) => {
  User.find({}, (err, posts) => {
    res.render("admin/manageuser", { postContent: posts,
      isAuthenticated: req.isAuthenticated(),
      user: req.user 
       });
  });
})


app.post("/deleteUser", (req, res) => {
  const checkedItemId = req.body.remove;
        User.findByIdAndRemove(checkedItemId, (err) => {
          if(!err){console.log("Successfully deleted Item"); res.redirect("/admin/manageuser");}
        });
}) //This line of code deletes a user from the database;

app.post("/deleteProduct", deleteProductRouter)



app.get("/apartments", apartmentsRouter);

app.post("/apartments", apartmentOrderRouter);

app.get("/houses", housesRouter);

app.post("/houses", houseOrderRouter);

app.get("/index", homePageRouter);

app.post("/index", uploadOrderRouter)

app.get("/posts/:postId", singleProductRouter);

app.get("/admin/addproduct", addProductsPageRouter);

app.post("/admin/addproduct", upload, uploadProductRouter);

app.get("/login", loginRouter);

app.post("/login", (req, res, next) => {
  
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.mobile,
    address1: req.body.address1,
    address2: req.body.address2
  });
  req.login(user,  (err) =>{
    if (err) { res.send(JSON.stringify(err.message));} 
    else {
      passport.authenticate("local", {successRedirect: 'back', failureRedirect: 'back', failureFlash: 'true'})(req, res,(err) => {
        res.redirect('back');
      });
    }
  });
 
});

app.get("/register",  registerRouter);

app.post("/register",  (req, res) => {
  User.register(
    { username: req.body.username,
      password: req.body.password, 
      email: req.body.email, 
      mobile: req.body.mobile, 
      address1: req.body.address1, 
      address2: req.body.address2
    },
      req.body.password, 
    (err, user) => {
      if (err) {
       res.send(JSON.stringify(err.message));
      } else {

        passport.authenticate("local",{successRedirect: 'back', failureRedirect: 'back', failureFlash: 'true'})(req, res, () => {
          res.redirect("back");
        });
      }
    }
  );
});

app.get("/logout",(req, res) => {
  req.logout((err) => {
    if(!err){
      res.redirect("/index");
    }
  }); 
});

//The below lines of code connects you to either the cloud or local host 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => console.log("Server is running on port 8000 and database is connected successfully"));