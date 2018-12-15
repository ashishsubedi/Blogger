
const loginController = {};

loginController.post = (req,res,next)=>{
    res.end("user authenticated");
};

loginController.get = (req,res,next)=>{
    res.render("login");
};

module.exports = loginController;