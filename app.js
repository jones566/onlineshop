require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
const passportLocalMongoose = require("passport-local-mongoose");


const homeStartingContent = "ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod";
const aboutContent = "An atom is the smallest particle of an element that can take part in a chemical reaction";
const contactContent = "Science is the method of obtaining knowledge through observation and experimentation";
 

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-Jones:Malachi456.@atlascluster.gps7jki.mongodb.net/blogDB");

const postSchema = new mongoose.Schema({
  title: String,
  content: String 
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

app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/register",  (req, res) =>{
  res.render("register");
});

app.get("/home", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
   Post.find({}, (err, posts) => {
   	
   			res.render("home", {startingContent: homeStartingContent, postContent: posts});
   });   
   
});
app.get("/about", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
   res.render("about", {aboutContents: aboutContent});
});
app.get("/contact", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
   res.render("contact", {contactContents: contactContent});
});
app.get("/compose", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
   res.render("compose");
});
app.post("/compose", (req, res) => {
  
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save((err) => {
  	if (!err) {
  		res.redirect("/home");
  	}
  });

});

app.get("/posts/:postId", (req, res) =>{

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, (err, post) =>{
    res.render("post", {
      title: post.title,
      content: post.content
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
        res.redirect("/compose");
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
        res.redirect("/compose");
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