const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


const user = require("./routes/userRoute");
const post = require("./routes/userPost");

const session = require("express-session");

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));


//  app.set("view engine", "ejs");
// app.set("views", "./views");

app.use("/", user.userRoute);
app.use("/post", post.postRouter);
app.use('/public',express.static(__dirname +'/public'));





module.exports = app;
