const registerController = {};

registerController.post = (req,res,next)=>{

    User.findOne({$or:[
      {username : req.body.username},{email: req.body.email}
    ]})
    .then((user)=>{
      if(user != null){
        var err = new Error("User already exists!");
        err.status = 403;
        next(err);
      }
      else{
        return User.create({
          name : req.body.name,
          username : req.body.username,
          password: req.body.password,
          email: req.body.email });     
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