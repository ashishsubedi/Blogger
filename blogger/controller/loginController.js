const User = require("../model/user");

const loginController = {};

loginController.post = (req,res,next)=>{
   console.log("HEE");

   console.log(req.user);
    if(req.user){
        res.end("Login Successfull");
    }else{
        res.end("Login Failed")
    }

      
};

loginController.get = (req,res,next)=>{
    res.render("login");
};

module.exports = loginController;