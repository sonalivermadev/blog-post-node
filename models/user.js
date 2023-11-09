const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
   // validate:[validator.isEmail]
  },
  image:{
    type: String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  is_admin:{
    type:Number,
    //required:true
  },
  is_verified:{
    type:Number,
    default:0
  }
}); 
module.exports = mongoose.model("User", UserSchema);
