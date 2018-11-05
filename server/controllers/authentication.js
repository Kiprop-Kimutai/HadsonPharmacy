var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req,res){
    console.log(req.body);
    console.log("0-----");
    var user = new User();
    user.email = req.body.email;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;

    user.setPassword(req.body.password);
    //save user and generate jwt
    user.save(function(err){
        var token;
        token = user.generateJwt();
        res.json({
            "token":token
        })
    })
}

module.exports.login = function(req,res){
    passport.authenticate('local',function(err,user,info){
        console.log(JSON.stringify(user));
        var token;
        //if passport cathches error
        if(err){
            res.status(504).json(err);
            return;
        }

        //if a user is found
        if(user){
            token = user.generateJwt();
            res.status(201).json({"token":token})
        }

        //else if no user is found
        res.status(401).json(info);
    })(req,res)
}