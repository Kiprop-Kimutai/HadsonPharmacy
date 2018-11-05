var express = require('express');
var bodyParser = require('body-parser');
var Sales = require('../models/sales');
var mongoose = require('mongoose');
var SalesOrder = mongoose.model('SalesOrder');
var Product = mongoose.model('Product');
//var SalesOrder = require('../models/sales_order');
//var Product = require('../models/products');
var ApiResponse = require('../models/response');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(requestAnimationFrame,res,next) =>{
    res.send("sales endpoint hitting...");
})

//this endpoint should save sales as a JSON array
app.post('/savesales', (req,res,next) =>{
    console.log("posting sales.....");
    console.log(req.body.sales);
    console.log(req.body.salesOrder);
    var response = new ApiResponse("","");
    /**
     * action points:-update products,save salesorder,save sales
     */
    var updateProductsPromise = new Promise((resolve,reject) =>{
        for(let salesorder of req.body.salesOrder){
            console.log(salesorder);
            Product.find({invoice_no:salesorder.invoice_no,product_code:salesorder.product_code,product_name:salesorder.name,product_id:salesorder.product},(err,product) =>{
                if(err){
                    console.error(err);
                    reject(err);
                }
                else{
                    //now update product
                    console.log("----1---");
                    console.log(product[0].onhand_qty);
                    console.log(salesorder.quantity);
                    console.log("---------");
                    console.log(product);
                    let currentQuantity = (Number(product[0].onhand_qty) - Number(salesorder.quantity));
                    Product.update({invoice_no:salesorder.invoice_no,product_code:salesorder.product_code,product_name:salesorder.name,product_id:salesorder.product},{onhand_qty:currentQuantity},(err,product) =>{
                        if(err){
                            console.error(err);
                            reject(err);
                        }
                        else{
                            console.log("product updated successfully");
                            console.log(product);
                            resolve(new ApiResponse(201,"Product updated successfully"));
                        }
                    })
                }
            })
        }
    })

    //save sales order
    var saveSalesOrderPromise = new Promise((resolve,reject) =>{
        for(salesorder of req.body.salesOrder){
            var salesOrder = new SalesOrder({
            receipt_number:salesorder.receipt_number,
            invoice:salesorder.invoice_no,
            product:salesorder.product,
            quantity:salesorder.quantity,
            amount:salesorder.amount,
            profit:salesorder.profit,
            product_code:salesorder.product_code,
            gen_name:salesorder.gen_name,
            name:salesorder.name,
            price:salesorder.price,
            ordering_price:salesorder.ordering_price,
            discount:salesorder.discount
        })

        salesOrder.save((err) =>{
            if(err){
                console.error(err);
                reject(err);
            }
            else{
                console.log("salesorder posted successfully");
                resolve(new ApiResponse(201,"Sales order posted successfully"));
            }
        })
    }
    })

    //now save sales
    var postSales = new Promise((resolve,reject) =>{
        var sales = new Sales({
            receipt_number:req.body.sales.receipt_number,
            cashier:req.body.sales.cashier,
            cash:req.body.sales.cash,
            amount:req.body.sales.amount,
            profit:req.body.sales.profit,
            name:req.body.sales.name,
            balance:req.body.sales.balance,
        })

        sales.save({},(err)=>{
            if(err){
                console.error("Error saving sales");
                reject(err);
            }
            else{
                console.log("Sales posted successfully");
                resolve(new ApiResponse(201,"Sales posted successfully"));
            }
        })
    })

    //chain all promises

    Promise.all([updateProductsPromise,saveSalesOrderPromise,postSales]).then((result)=>{
        console.log(result);
        res.send(result);
    })

})

module.exports = app;