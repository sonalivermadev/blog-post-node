const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      //required: true,
    },
    body: {
      type: String,
      trim: true,
      //required: true,
    },
    photo: {
      type: String,
      default: "no photo",
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now,
    } 
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
