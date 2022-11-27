import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import passportLocalMongoose from "passport-local-mongoose";
import ejs from "ejs";
import _ from "lodash";


import connectEnsureLogin from "connect-ensure-login";
import {addGalleryRouter, uploadGalleryRouter, galleryUpload} from './routes/galleries.js';
import galleriesRouter from "./routes/galleries.js";
import {uploadNewsRouter, singlePostRouter, addNewsPageRouter, upload, 
       uploadOrderRouter, allOrderRouter, allProductsRouter, deleteProductRouter, deleteOrderRouter, apartmentsRouter, housesRouter, apartmentOrderRouter, houseOrderRouter} 
       from './routes/news.js';
import allNewsRouter from "./routes/news.js";
//import upload from "./models/imagesModel.js";
//import galleryUpload from "./models/imagesModel.js"
import loginRouter, { addUserRouter } from "./routes/authentication.js";
import {registerRouter}  from "./routes/authentication.js";
import examOfficeRouter from "./routes/examOffice.js";
import programmesRouter from "./routes/programmes.js";
import researchRouter from "./routes/research.js";
import staffRouter from "./routes/staff.js";
import studentsRouter from "./routes/students.js";
import departmentRouter from "./routes/departments.js";
import pharmChemRouter from "./routes/pharmchem.js";
import pharmacologyRouter from "./routes/pharmacology.js";
//import pharmaceuticsRouter from "./routes/pharmaceutics.js";
import pharmacognosyRouter from "./routes/pharmacognosy.js";
import pharm_practiceRouter from "./routes/pharmpractice.js";





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
       //The below commented line of code uses passport for user authentication
       
mongoose.connect("mongodb+srv://admin-Jones:Malachi456.@atlascluster.gps7jki.mongodb.net/realestateDB");  //This connects you to the database locally

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



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id,  (err, user) =>{
    done(err, user);
  });
  
});


//The below lines of code are the APIs Routes

app.get("/pharm_chem",connectEnsureLogin.ensureLoggedIn('/register'), pharmChemRouter); //This ensures that a user is registered before allowed to book

app.get("/admin/sumit_form", pharmacologyRouter);

app.get("/admin/indexes",  (req, res) => {
  User.find({}, (err, posts) => {
    res.render("admin/indexes", { postContent: posts,
      isAuthenticated: req.isAuthenticated(),
      user: req.user 
       });
  });
}); //This is the admin dashboard route;

app.get("/admin/sidenav", pharmacognosyRouter);

app.get("/admin/topheader", pharm_practiceRouter);
  
app.get("/admin/footer",  departmentRouter);

//app.get("/admin/addproduct", studentsRouter);

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

//app.get("/admin/productlist", staffRouter);

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

//app.get("/admin/adduser", programmesRouter);

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

//app.get("/admin/manageuser", examOfficeRouter);

app.get("/apartments", apartmentsRouter);

app.post("/apartments", apartmentOrderRouter);

app.get("/houses", housesRouter);

app.post("/houses", houseOrderRouter);

app.get("/index", allNewsRouter);

app.post("/index", uploadOrderRouter)

app.get("/posts/:postId", singlePostRouter, galleriesRouter);

app.get("/admin/addproduct", addNewsPageRouter);

app.post("/admin/addproduct", upload, uploadNewsRouter);

//app.get("/posts/:postId", galleriesRouter );

//app.get("/gallery/:galleryId", galleryRouter);

app.get("/add_gallery", addGalleryRouter);

app.post("/add_gallery", galleryUpload, uploadGalleryRouter);

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
  
  user.save((err) => {
    if (err) {
      res.send(JSON.stringify(err.message)); 
    }
  });
  
  
  req.login(user,  (err) =>{
    if (err) { return next} 
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

//The below line of code is just for testing purpose
app.get("/test", (req, res) => {
  res.render("test");
});

//The below lines of code connects you to either the cloud or local host 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => console.log("Server is running on port 8000 and database is connected successfully"));