var mongoose = require('mongoose');
var dburl ="mongodb://localhost:27017/hadsonhealth";
var gracefullshutdown;

if(process.env.NODE_ENV==='production'){
    //use production db url here
}

mongoose.connect(dburl,{useNewUrlParser:true});
//connection events here
mongoose.connection.on('connectd',()=>{console.log("Database successfully connected at %s",dburl)});
mongoose.connection.on('error',(err)=>{console.log("Database connection failed with error"+err)});
mongoose.connection.on('disconnected',()=>{console.log("Mongoose connection disconnected")});

//CAPTURE APP TERMINATION/RESTART EVENTS
//To be called when app is terminated/restarted
gracefullshutdown = function(msg,callback){
    mongoose.connection.close(()=>{
        console.log("Mongoose disconnected through"+msg);
        callback();
    })
}

//For nodemon restarts
process.once('SIGUSR2',function(){
    gracefulShutdown('nodemon restart',function(){
        process.kill(process.pid,'SIGUSR2');
    });
});

//for app termination
process.on('SIGINT',function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    })
})

//import schemas here
require("./device");
require('./product_catalogue');
require('./products');
require('./purchase_order');
require('./response');
require('./sales');
require('./sales_order');
require('./users');