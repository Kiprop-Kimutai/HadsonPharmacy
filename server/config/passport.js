var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField:'email'
},function(username,password,done){
    User.findOne({email:username},(err,user)=>{
        if(err){return done(err);}
        //return if user not found in database
        if(!user){
            return done(null,false,{message:"No user found"});
        }
        //return if password does not match
        if(!user.validPassword(password)){
            return done(null,false,{message:'wrong password'})
        }
        //if credentials are correct, return user object
        return done(null,user);
    })
}))