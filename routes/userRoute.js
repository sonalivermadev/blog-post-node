const express = require("express");
const userRoute = express();

userRoute.set("view engine", "ejs");
userRoute.set("views", "./views/users");

// const session = require("express-session");
const config = require("../config/config");
// userRoute.use(session({ secret: config.sessionSecret }));

const auth = require("../middleware/auth");

const bodyParser = require("body-parser");
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

 const multer = require("multer");
 const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"public/image")
  }
  ,
  filename: (req, file, cb)=> {
    const name = (file.fieldname+"-"+Date.now()+path.extname(file.originalname));
    cb(null, name);
  },
});

var upload = multer({ storage: storage}).single('image')

const userController = require("../controller/userController");
userRoute.post("/register",upload , userController.insertUser);
userRoute.get("/register", auth.islogout, userController.userRegistration);

userRoute.get("/", auth.islogout, userController.loginuser);
userRoute.get("/list", auth.islogin, userController.alluser);
userRoute.get("/login", auth.islogout, userController.loginuser);
userRoute.post("/login", userController.verifylogin);

userRoute.get("/home", auth.islogin, userController.loadhome);
userRoute.get("/logout", auth.islogin, userController.userlogout);
userRoute.get("/edit", auth.islogin, userController.editprofile);
userRoute.post("/edit", userController.Updatedprofile);
module.exports = {
  userRoute,
};
