var express = require('express');
var PurchaseOrder = require('../models/purchase_order');
var ApiResponse = require('../models/response');
var app = express();

//handle LPO routes and business logic here
app.get('/',(req,res,next) =>{
    res.send("LPO routes hitting...");
})

//save lpo's
app.post('/save_lpo', function(req,res,next){
    console.log(req.body);
    console.log(req.body.products);
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
    console.log("---------");
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

module.exports = app;