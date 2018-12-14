var express = require('express');
var router = express.Router();

const authCheck = (req,res,next)=>{
    if(!req.user){
        res.redirect('/users/login');
    }else{
        next();
    }
}

/* GET home page. */
router.get('/', authCheck,function(req, res, next) {
  res.end('Welcome to your profile, '+ req.user.name);
});

module.exports = router;
