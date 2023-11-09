
const express = require("express");
const postRouter=express();

  postRouter.set("view engine", "ejs");
postRouter.set("views", "./views/post");

const session = require("express-session");
const config = require("../config/config");
postRouter.use(session({ secret: config.sessionSecret }));

const auth = require("../middleware/auth");

const bodyParser = require("body-parser");
postRouter.use(bodyParser.json());
postRouter.use(bodyParser.urlencoded({ extended: true }));
const postController=require("../controller/postController");

postRouter.get("/all",postController.getallpost);
postRouter.post("/create",auth.islogin,postController.createpost);
postRouter.get("/createpost",auth.islogin,postController.openaddpost)
postRouter.get("/mypost", auth.islogin,postController.getpost);

postRouter.get("/edit/:id",auth.islogin,postController.editpost)//open update form
postRouter.post("/update/:id",auth.islogin,postController.updatedpost);
postRouter.get("/delete/:id",auth.islogin,postController.deletepost);

module.exports={
    postRouter
} 