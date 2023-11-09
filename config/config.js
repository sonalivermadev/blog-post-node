const mongoose = require("mongoose");
// const sessionSecret = "sessionSecret";
const DBconnected = () => {
  mongoose
    .connect(
      "mongodb+srv://sonalverma:5lJ4TPallpzwehbj@cluster0.c96ikii.mongodb.net/myproject"
    )
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  DBconnected,
};
