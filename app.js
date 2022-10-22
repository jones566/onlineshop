require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
const passportLocalMongoose = require("passport-local-mongoose");



const aboutContent = "An atom is the smallest particle of an element that can take part in a chemical reaction";
const contactContent = "Science is the method of obtaining knowledge through observation and experimentation";

 

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("images"))

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-Jones:Malachi456.@atlascluster.gps7jki.mongodb.net/blogDB");

const postSchema = new mongoose.Schema({
  title: {type: String},
  content: {type: String},
  image:
    {
        type: String,
        default: ""
    } 
});

const Post = mongoose.model("Post", postSchema);

const securitySchema = new mongoose.Schema({
  username: String,
  password: String 
});

securitySchema.plugin(passportLocalMongoose);

const Security = mongoose.model("Security", securitySchema);

passport.use(Security.createStrategy());

passport.serializeUser(Security.serializeUser());

passport.deserializeUser(Security.deserializeUser());


  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '_' + file.originalname);
    }
});
  
const upload = multer({ storage: storage }).single('image');

app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/register",  (req, res) =>{
  res.render("register");
});

app.get("/departments",  (req, res) =>{
  res.render("departments");
});

app.get("/students",  (req, res) =>{
  res.render("students");
});

app.get("/staff",  (req, res) =>{
  res.render("staff");
});

app.get("/research",  (req, res) =>{
  res.render("research");
});

app.get("/programmes",  (req, res) =>{
  res.render("programmes");
});

app.get("/exam_office",  (req, res) =>{
  res.render("exam_office");
});


app.get("/index", (req, res) => {
   Post.find({}, (err, posts) => {
   	
   			res.render("index", {postContent: posts});
   });   
   
});
app.get("/about", (req, res) => {
   res.render("about", {aboutContents: aboutContent});
});
app.get("/contact", (req, res) => {
   res.render("contact", {contactContents: contactContent});
});
app.get("/add_news_blog", (req, res) => {
   res.render("add_news_blog");
});
app.post("/add_news_blog", upload, (req, res) => {
  res.locals.postTitle = req.body.postTitle
  res.locals.postBody = req.body.postBody
  const post = new Post (
    
    {
    title: req.body.postTitle,
    content: req.body.postBody,
    image: req.file.filename
    });

  post.save((err) => {
  	if (!err) {
  		res.redirect("/index");
  	}
  });

});

app.get("/posts/:postId", (req, res) =>{

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, (err, post) =>{
    res.render("news", {
      title: post.title,
      content: post.content,
      image: post.image
    });
  });

});

app.post("/register",  (req, res) =>{

  Security.register({username: req.body.username}, req.body.password,  (err, user) =>{
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else{
      passport.authenticate("local")(req, res, () =>{
        res.redirect("/add_news_blog");
      });
    }

   });

});

app.post("/login",  (req, res) =>{

  const user = new Security({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user,  (err) =>{
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res,  () =>{
        res.redirect("/add_news_blog");
      });
    }
  });

});



app.get("/logout",  (req, res) =>{
  req.logout((err) => {
    if(!err){
      res.redirect("/login");
    }
  });
  
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("Server is running on port 3000"));