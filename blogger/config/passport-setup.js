var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

//const User = require('../model/userModel');

const userInfo = {};

passport.serializeUser((user,done)=>{
	done(null,user.id);
});

passport.deserializeUser((id,done)=>{
	//User.findById(id).then((user)=>{
    const user = userInfo[id];
		done(null,user);
	//});	
});
const keys = require("./keys");

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/users/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    userInfo[profile.id] = profile;
    done(null,profile); 
    /* User.findOne({
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
    .catch(err=>done(err));  */
  }
	
));


