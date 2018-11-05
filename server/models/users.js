var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{type:String,unique:true,required:true},
    firstname:String,
    lastname:String,
    salt:String,
    hash:String
})

//set password
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    //this.hash = crypto.pbkdf2(password,this.salt,1000,64,'sha512').toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

}

//validate password
userSchema.methods.validPassword = function(password){
    //var hash = crypto.pbkdf2(password,this.salt,1000,64,'sha512').toString('hex');
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

//generate json web token
userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate()+7);//set expiry to seven days after
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.username,
        exp:parseInt(expiry.getTime()/1000)
    },"SECRET_KEY") //do not keep secret key in code
}

mongoose.model('User',userSchema);

