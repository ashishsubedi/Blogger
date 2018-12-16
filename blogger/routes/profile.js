var express = require('express');
var router = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
const postController = require("../controller/postController");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/',function(req, res, next) {
    res.render('home',{
        posts: req.user._userPosts
    })
});
router.post('/post',postController.post);
router.get('/post',postController.get);


module.exports = router;
