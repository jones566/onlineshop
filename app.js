import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";

//import session from "express-session";
//import passport from "passport";
//import connectEnsureLogin from "connect-ensure-login";
//import passportLocalMongoose from "passport-local-mongoose";
import {galleryRouter, addGalleryRouter, uploadGalleryRouter, galleryUpload} from './routes/galleries.js';
import galleriesRouter from "./routes/galleries.js";
import {uploadNewsRouter, singlePostRouter, addNewsPageRouter, upload} from './routes/news.js';
import allNewsRouter from "./routes/news.js";
//import upload from "./models/imagesModel.js";
//import galleryUpload from "./models/imagesModel.js"
import loginRouter from "./routes/authentication.js";
import registerRouter from "./routes/authentication.js";
import registerAuthRouter from "./routes/authentication.js";
import loginAuthRouter from "./routes/authentication.js";
import logoutRouter from "./routes/authentication.js";
import examOfficeRouter from "./routes/examOffice.js";
import programmesRouter from "./routes/programmes.js";
import researchRouter from "./routes/research.js";
import staffRouter from "./routes/staff.js";
import studentsRouter from "./routes/students.js";
import departmentRouter from "./routes/departments.js";
import pharmChemRouter from "./routes/pharmchem.js";
import pharmacologyRouter from "./routes/pharmacology.js";
import pharmaceuticsRouter from "./routes/pharmaceutics.js";
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
/*app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));*/


       //The below commented line of code uses passport for user authentication
/*       
        app.use(passport.initialize());
        app.use(passport.session());
        securitySchema.plugin(passportLocalMongoose);
        passport.use(Security.createStrategy());
        passport.serializeUser(Security.serializeUser());
        passport.deserializeUser(Security.deserializeUser());
*/

mongoose.connect("mongodb+srv://admin-Jones:Malachi456.@atlascluster.gps7jki.mongodb.net/blogDB");  //This connects you to atlas

//The below lines of code are the APIs Routes

app.get("/pharm_chem", pharmChemRouter);

app.get("/pharmacology", pharmacologyRouter);

app.get("/pharmaceutics", pharmaceuticsRouter);

app.get("/pharmacognosy", pharmacognosyRouter);

app.get("/pharm_practice", pharm_practiceRouter);
  
app.get("/departments",  departmentRouter);

app.get("/students", studentsRouter);

app.get("/staff", staffRouter);

app.get("/research", researchRouter);

app.get("/programmes", programmesRouter);

app.get("/exam_office", examOfficeRouter);

app.get("/index", allNewsRouter);

app.get("/posts/:postId", singlePostRouter);

app.get("/add_news", addNewsPageRouter);

app.post("/add_news", upload, uploadNewsRouter);

app.get("/galleries", galleriesRouter );

app.get("/gallery/:galleryId", galleryRouter);

app.get("/add_gallery", addGalleryRouter);

app.post("/add_gallery", galleryUpload, uploadGalleryRouter);

app.get("/login", loginRouter);

app.post("/login", loginAuthRouter);

app.get("/register",  registerRouter);

app.post("/register",  registerAuthRouter);

app.get("/logout", logoutRouter);

//The below lines of code connects you to either the cloud or local host 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("Server is running on port 3000 and database is connected successfully"));