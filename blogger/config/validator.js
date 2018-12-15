const User = require('../model/userModel');

const validator = {};

validator.findGoogleUserOrCreate = (req,res,next)=>{
    User.findOne({
        'google.googleid' : req.user.id
      },(err,user)=>{
        if(err) return next(err);
        if(!user){
          //If password matches default password, give them option to change them and username
          User.create({
           method : 'google',
           google:{
               googleid : req.user.id,
               email: req.user.emails[0].value,
               name: req.user.displayName
           }
          })
          .then((newUser)=>{
              return true 
          });
        }
        else{

            return true; 
        }
      })
      .catch(err=>next(err));
}

module.exports = validator;