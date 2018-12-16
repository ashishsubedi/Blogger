const User = require("../model/user");

const loginController = {};

loginController.post = (req,res,next)=>{
   console.log("HEE");

   console.log(req.user);
   
    res.redirect('/profile');
    

      
};

loginController.get = (req,res,next)=>{
    res.render("login");
};

module.exports = loginController;