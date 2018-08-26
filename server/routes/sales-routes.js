var express = require('express');
var bodyParser = require('body-parser');
var Sales = require('../models/sales');
var SalesOrder = require('../models/sales_order');
var ApiResponse = require('../models/response');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(requestAnimationFrame,res,next) =>{
    res.send("sales endpoint hitting...");
})

//this endpoint should save products as a JSON array
app.save('/saveproduct', (req,res,next) =>{
    var response = new ApiResponse("","");
    new Promise(function (resolve,reject){
        for(var i =0;i<req.body.data.length;i++){
            var sales = new Sales({
                receipt_number:req.body.data[i].receipt_number,
                cashier:req.body.data[i].cashier,
                amount:req.body.data[i].amount,
                profit:req.body.data[i].profit,
                name:req.body.data[i].name,
                balance:req.body.data[i].balance,
            })

            //save sales
            sales.save((err) =>{
                if(err){
                    response.response_message += new String("Error saving sale invoice:%",sales.invoice_number);
                    reject(response_message)
                }
                else{
                    resolve(new ApiResponse("",""));
                }
            })
        }
    }).then(function(result){
        res.json(result);
    },function(err){
        res.json(new ApiResponse(321,response.response_message));
    })
})