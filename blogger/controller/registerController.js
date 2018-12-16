const registerController = {};
const User = require("../model/user");


registerController.post = (req,res,next)=>{

    User.findOne({$or:[
      {'local.username' : req.body.username},{'local.email': req.body.email}
    ]})
    .then((user)=>{
      if(user != null){
        var err = new Error("User already exists!");
        err.status = 403;
        next(err);
      }
      else{
        return User.create({
          local:{
            name : req.body.name,
            username : req.body.username,
            password: req.body.password,
            email: req.body.email 

          }
        });     
      }  
    })
    .then((user)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html');
      res.redirect('/users/login');
    },(err)=>next(err))
    .catch(err => next(err));
  };

  registerController.get = (req,res,next)=>{
    res.render("register");
};
  module.exports = registerController;