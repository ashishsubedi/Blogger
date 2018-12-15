var express = require('express');
var router = express.Router();

var passport = require('passport');

const bodyParser = require('body-parser');

const registerController = require("../controller/registerController");
const loginController = require("../controller/loginController");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Handle registration
router.get('/register',registerController.get);
router.post('/register',registerController.post);


//Handle Login
router.get('/login',loginController.get);
router.post('/login',loginController.post);

//Handle google sign In 

router.get('/google',passport.authenticate('google',{
    scope: ['profile','email']
  }
));
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/users/login' }),(req,res)=>{
    console.log("REq :"+ req );
    res.status(200).redirect('/profile');
  }
);

//Handle Logout
router.post('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;
