
const User = require("../models/user");
const bcrypt = require("bcrypt");
const userRegistration = async (req, res) => {
  try {
    res.render("registration");
  } catch (err) {
    console.log(err.message);
  }
};
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
    //console.log( passwordHash);
  } catch (err) {
    console.log(err.message);
  }
};

const insertUser = async (req, res) => {
  try {
    if (req.file && (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png")) {
      const spassword = await securePassword(req.body.password);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        image: req.file.filename,
        password: spassword,
      });
      const userData = await user.save();
      console.log(userData);
      if (userData) {
        res.redirect("/login");
      } else {
        res.render("registration", { message: "Registration failed" });
      }
    } else {
      res.render("registration", { message: "Invalid file type or no file provided" });
    }
  } catch (err) {
    res.json({ message: "Registration failed", error: err });
  }
};

//login users
const loginuser = async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err.message);
  }
};
const verifylogin = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const userData = await User.findOne({ email: email });
    //console.log(userData,req.session)
    if (userData) {
      console.log(userData);
      const passwordmatch = await bcrypt.compare(password, userData.password);
      if (passwordmatch) {
        // console.log(passwordmatch);
        //if (userData.is_verified  === 0) {
        // res.render("login", { message: "please verify email" });
        //}
        //else {
        req.session.user_id = userData._id;
        res.redirect("/home");
        //}
      } else {
        res.render("login", { message: "email & password wrong" });
      }
    } else {
      res.render("login", { message: "email & password wrong" });
    }
  } catch (err) {
    console.log(err.message);
  }
};
const loadhome = async (req, res) => {
  try {
    //console.log(req.session.user_id);
    const userData = await User.findById({ _id: req.session.user_id });
    res.render("home", { user: userData });
  } catch (err) {
    console.log(err.message);
  }
};
const userlogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err.meassage);
  }
};
// user profile edit and update
const editprofile = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    const userData = await User.findById({ _id: id });
    if (userData) {
      res.render("edit", { user: userData });
    } else {
      res.redirect("/home");
    }
  } catch (err) {
    console.log(err.message);
  }
};
const Updatedprofile = async (req, res) => {
  try {
    console.log("update profile", req.body);
    if (req.file) {
      await User.findByIdAndUpdate(
        { _id: req.body.user_id },
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            image: req.file.filename,
          },
        }
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: req.body.user_id },
        { $set: { username: req.body.username } }
      );
    }
    res.redirect("/home");
  } catch (err) {
    console.log(err.message);
  }
};
const alluser= (req, res) => {
  res.render("login", { title: " list all users" });
};
module.exports = {
  userRegistration,
  insertUser,
  loginuser,
  verifylogin,
  loadhome,
  userlogout,
  editprofile,
  Updatedprofile,
  alluser
};
