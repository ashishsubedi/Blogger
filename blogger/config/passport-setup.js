var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../model/users');

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
    console.log(profile);
    User.findOne({
      googleid: profile.id
    }).then((user)=>{
      if(user){
        //User Exist, redirect to login
        done(null,user);
        
      }else{
		//Save to database
		
        return User.create({
          googleid: profile.id,
			name : profile.displayName,
			username : (profile.name.givenName + profile.id),
			email: profile.emails[0].value,
			password: "defaultPasswordWillEncodeLater" });  
      }
    })
	.then((user)=>{
		done(null,user);
	},err=>console.log(err))
	.catch(err=>console.log(err)); 

  }
	
));
