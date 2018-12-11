var express = require('express');
var bodyParser = require('body-parser');
const pdfshift = require('pdfshift')('120d8e8a86d2....................');
const fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.post('/print',(req,res,next) =>{
    console.log(req.body.url);
    pdfshift.convert('req.body.url').then(function (binary_file) {
        console.log(binary_file);
    fs.writeFile('./invoice.pdf', binary_file, "binary", function () {console.log("done")})
}).catch(function({message, code, response, errors = null}) {})
    //res.status(201).json({"message":"done"});
})



module.exports = app;