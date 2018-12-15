var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../model/user');

passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser((id,done)=>{
	User.findById(id).then((user)=>{
		done(null,user);
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
