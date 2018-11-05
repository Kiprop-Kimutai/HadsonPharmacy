var express = require('express');
var mongoose = require('mongoose');
var PurchaseOrder = mongoose.model('PurchaseOrder');
var Product = mongoose.model('Product');
//var PurchaseOrder = require('../models/purchase_order');
//var Product = require('../models/products');
var ApiResponse = require('../models/response');
var app = express();

//handle LPO routes and business logic here
app.get('/',(req,res,next) =>{
    res.send("LPO routes hitting...");
})

//save lpo's
app.post('/save_lpo', function(req,res,next){
    console.log(req.body);
    console.log("--------");
    console.log(req.body.products);
    //return new ApiResponse(201,"ok");
    //if status is 'received' or 'cancelled'
    if(req.body.status === 'received' || req.body.status === 'cancelled'){
        //update the lpo as received, then save products to products'table
        new Promise((resolve,reject) =>{
            PurchaseOrder.update({id:req.body.id},req.body,(err,res) =>{
                if(err){
                    console.error("Error updating LPO item");
                    reject(new ApiResponse(307,"Error updating LPO"));
                }
                else{
                    console.log("Document updated successfully");
                    console.log("-------GOING TO UPDATE PRODUCTS----------------");
                    //loop through products in lpoItem saving each item
                    for(product of req.body.products){
                        console.log("------pppppp----------");
                        console.log(product);
                        //var productt = new Product(product);
                        new Product(product).save((err)=>{
                            if(err){
                                console.log(err);
                                console.log("Error adding product code "+product.product_code + " to stock");
                                //continue
                            }
                        });
                    }
                    resolve(new ApiResponse(201,"LPO item updated successfully"));
                }
            })
        }).then((response) =>{
            res.json(response);
        })
    }

    //if status is 'pending'
    else{
    new Promise((resolve,reject) =>{
        var lpo = new PurchaseOrder({
            ordered_by:req.body.ordered_by,
            invoice_no:req.body.invoice_no,
            status:req.body.status,
            description:req.body.description,
            supplier:req.body.supplier,
            po_number:req.body.po_number,
            date:req.body.Date,
            raised_by:req.body.raised_by,
            products:req.body.products
        })
        
        lpo.save((err)=>{
            if(err){
            console.log(err);
            reject(new ApiResponse(300,"Error saving lpo"));
            }
            else{
                resolve(new ApiResponse(201,"LPO saved successfully"));
            }
        })
    }).then((result)=>{
        console.log(result);
        res.json(result);
    })
    }
})

//retrieve last LPO index
app.get('/last_lpo_index',(req,res,next)=>{
    new Promise((resolve,reject)=>{
        PurchaseOrder.find({},function(err,lpos){
            if(err){
                reject(new ApiResponse(303,"Error retrieving LPOs"));
            }
            else{
                console.log("Record size::"+lpos.length);
                if(lpos.length==0){
                    let nextId = 1;
                    resolve(new ApiResponse(201,nextId));
                }
                else{
                    console.log(lpos.length);
                    console.log(lpos[lpos.length-1]);
                    //let nextId = +lpos[(lpos.length-1)].id+1;
                    let nextId = lpos.length+1;
                    resolve(new ApiResponse(201,nextId));
                }
            }
        })
    }).then((result)=>{
        res.json(result);
    })
})

//get all lpos
app.get('/fetch_all_lpos',function(req,res,next){
    console.log("<------->");
    new Promise((resolve,reject)=>{
        PurchaseOrder.find({},function(err,lpos){
            if(err){
                console.log(err);
                reject(new ApiResponse(304,"Error retreiving all lpos"));
            }
            else{
                resolve(new ApiResponse(201,lpos));
            }
        })
    }).then((result) =>{
        res.send(result);
    })
})

//get all pending lpos
app.get('/fetch_pending_lpos',(req,res,next) =>{
    new Promise((resolve,reject) =>{
        PurchaseOrder.find({status:"pending"},(err,lpos)=>{
            if(err){
                console.log(err);
                reject(new ApiResponse(305,"Error retreiving pending lpos"));
            }
            else{
                console.log(lpos);
                resolve(new ApiResponse(201,lpos));
            }
        })
    }).then((response) =>{
        res.send(response);
    })
})

//get pending LPO item by id
app.post('/fetch_onepending_lpo', (req,res,next) =>{
    console.log(req.body);
    new Promise((resolve,reject) =>{
        PurchaseOrder.find({id:req.body.Id},(err,lpoItem) =>{
            if(err){
                console.error(err);
                reject(new ApiResponse(306,"Error retreiving requested LPO item"));
            }
            else{
                console.log(lpoItem[0]);
                resolve(new ApiResponse(201,lpoItem[0]));
            }
        }).then((response) =>{
            res.send(response);
        })
    })
})

//update received lpo

module.exports = app;