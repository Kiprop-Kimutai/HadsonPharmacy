var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ProductCatalogue = mongoose.model('ProductCatalogue');
//var ProductCatalogue = require('../models/product_catalogue');
var ApiResponse = require('../models/response');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next) =>{
    res.send("hitting product catalogues... ");
})

/** endpoint to add new product description to catalogue */
app.post('/post-catalogue', (req,res,next) =>{
    console.log(req.body);
    new Promise(function(resolve,reject){
    
        var product_catalogue = new ProductCatalogue({
            code:req.body.code,
            generic_name:req.body.generic_name,
            name:req.body.name
        });
        product_catalogue.save((err)=>{
            if(err){
                console.error("Error adding  product to catalogue");
                reject(new ApiResponse(305,"Error adding product to catalogue"))
            }
            else{
                console.log("catalogue updated successfully");
                resolve(new ApiResponse(201,"catalogue updated successfully"));
            }
        })
    }).then((result) =>{
        res.json(result);
    })
})

app.get('/get-catalogue',(req,res,next) =>{
    new Promise((resolve,reject) =>{
        ProductCatalogue.find({},function(err,catalogs){
            if(err){
                console.error("Error fetching product catalogue");
                reject(new ApiResponse(305,"Error fetching catalogue"));
            }
            else{
                console.log(catalogs);
                resolve(new ApiResponse(201,catalogs));
            }
        })
    }).then((result) =>{
        res.json(result);
    })
})
module.exports = app;