var express = require('express');
var router = express.Router();

var passport = require('passport');

const bodyParser = require('body-parser');

var mongoose = require('mongoose');
const User = require("../model/users");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register',(req,res,next)=>{
    res.render("register");
})
router.post('/register',(req,res,next)=>{

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
});

router.get('/login',(req,res,next)=>{
  res.render("login");
})
router.post('/login',(req,res,next)=>{
res.end("user authenticated");
})


router.get('/google',passport.authenticate('google',{
  scope: ['profile','email']
}));
router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
  //Add User to database
  console.log("Works");
  
});



module.exports = router;
