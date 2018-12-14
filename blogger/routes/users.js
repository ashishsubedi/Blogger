var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register',(req,res,next)=>{
    res.render("register");
})
router.post('/register',(req,res,next)=>{
  res.end("user registered");
})

router.get('/login',(req,res,next)=>{
  res.render("login");
})
router.post('/login',(req,res,next)=>{
res.end("user authenticated");
})

module.exports = router;
