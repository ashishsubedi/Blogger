const PostController = {};
const db = require('../model');


PostController.post = (req,res,next)=>{
    db.User.findOne({
      //Get user from cookie session
      'local.username' : req.user.local.username
    })
    .then((user)=>{
      if(user === null) next(new Error("User not found"));

      db.Post.create({
        title: req.body.title,
        text: req.body.textArea,
        _creatorId: user._id
      })
      //PROBLEM HERE
      .then((post)=>{ 
        db.User.findOneAndUpdate({_id :user._id},{$set:{
          "_userPosts.$" :post
          
        }},()=>{
          res.redirect("/profile");
        })
        

        })
        .catch(err=>next(err));
    })     
    .catch(err => next(err));
  };

  PostController.get = (req,res,next)=>{
    console.log("INSIDE GET");

    console.log(req.user);

    res.render("post");
};
  module.exports = PostController;