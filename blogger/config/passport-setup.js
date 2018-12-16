var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
const keys = require("./keys");

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/users/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
 
    User.findOne({
      googleid: profile.id
    },(err,user)=>{
      if(err) return done(err);
      if(!user){
        //If password matches default password, give them option to change them and username
        User.create({
          googleid: profile.id,
          name : profile.displayName,
          username : (profile.name.givenName + profile.id),
          email: profile.emails[0].value,
          password: "defaultPasswordWillEncodeLater" 
        })
        .then((newUser)=>{
            done(null,newUser); 
        });
      }else{
        done(null,user)
      }
    })
    .catch(err=>done(err)); 
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({$or:[
      {'local.username' :  username},{'local.email': username}
    ]})
    .then(  user => {
      if (!user) { return done(null, false); }
      if (user.local.password !== password ) { return done(null, false); }
      done(null, user);
    })
    .catch(err=>{
      done(err)
    });

  }
));


