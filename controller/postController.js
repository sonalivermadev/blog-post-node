const Post = require("../models/posts");
const User = require("../models/user");
const createpost = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      res.status(422).json({ err: "please add all the field" });
    }
    console.log("title", title);
    //console.log(req.session.post_id);
    console.log("body", body);
    const user = await User.findById(req.session.user_id);
    console.log(user,req.session.user_id);
    //res.send("ok")
    const post = new Post({
      title,
      body,
      postedBy: user._id,
    });
    const userpost = await post.save();
    console.log(userpost);
    if (userpost) {
      res.redirect("/post/mypost");
      //res.render("create",{message:"add post successfully"});
      //res.status(200).json({ message: "data added ", data: userpost._id });
    } else {
      res.render("/post/createpost", { message: "add posts failed  " });
      //res.status(400).json({ message: "data not added ", data: {} });
    }
  } catch (err) {
    console.log(err);
  }
};
//addpost
const openaddpost=async(req,res)=>{
  res.render("createpost")
}
// get post--
const getpost = async (req, res) => {

  try {
    console.log(req.session.user_id)
    const posts = await Post.find({
        postedBy: req.session.user_id,
    });
  
    //console.log("posts", posts);
    res.render("mypost", { posts: posts });
    //res.status(200).json({ message: "post found", data: post });
  } catch (err) {
    console.log(err);
  }
};
//list all posts--
const getallpost = async (req, res) => {
  console.log(getallpost);
  try {
    const allposts = await Post.find().populate('postedBy');
    console.log('all posts', allposts);
    res.render('allpost',{posts:allposts})
    //res.send(allpost);
    // console.log(allpost);
    // if (!allpost) {
    //   res.status(404).json({ message: "post not found" });
    // } else {
    //    //res.render("all_post", { title: "all posts" });
    //   res.status(200).json({ message: "post found", data: allpost });
    // }
  } catch (err) {
    console.log(err.message);
  }
};
// edit post--
const editpost = async (req, res) => {
  try {
    const id = req.params.id; 
    console.log(id);
    const postData = await Post.findById({ _id: id });
    if (postData) {
      res.render("updatepost", { post: postData });
    } else {
      res.redirect("/home");
    }
  } catch (err) {
    console.log(err.message);
  }
};
// update post--
const updatedpost = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      res.redirect("/mypost")
      //res.status(400).json({ message: "post not found" });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
      },
      { new: true }
    );
    res.redirect("/post/mypost")
    //res.render("mypost", { message:"updated post successfully",posts: post });
    //res.render("update",{message:"updated post successfully"});
    //res.status(200).json({ message: "post updated successfully", data: post });
  } catch (err) {
    console.log(err);
    //res.render("update",{message:"updated post failed"});
    res.status(400).json({ message: "post not updated" });
  }
};
//deletedpost--
const deletepost = async (req, res) => {
  console.log("hello")
  let id = req.params.id;
  console.log(id);
  try {
    const posts = await Post.findByIdAndDelete({_id:id});
    console.log(posts)
   res.redirect("/post/mypost")
    //res.status(200).json({ message: "post deleted successfully", data: post });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "post not deleted" });
  }
};

module.exports = {
  createpost,
  openaddpost,
  getpost,
  editpost,
  updatedpost,
  deletepost,
  getallpost,
};
