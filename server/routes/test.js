var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/test',(req,res,next) =>{
    console.log("hitting...");
    console.log(req.body);
    res.status(201).json({"message":"running"});
})

module.exports = app;