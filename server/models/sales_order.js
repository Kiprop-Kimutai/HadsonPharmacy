var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
    _id:{type:String,require:true},
    seq:{type:Number,default:0}
})

var counter_schema = mongoose.model('counter_schema',counterSchema);

var salesOrderSchema = new Schema({
    id:{type:Number,unique:true},
    receipt_number:{type:String,unique:true},
    invoice:{type:String},
    product:{type:String},
    quantity:{type:Number},
    amount:{type:Number},
    profit:{type:Number},
    product_code:{type:String},
    gen_name:{type:String},
    name:{type:String},
    price:{type:Number},
    discount:{type:Number},
    created_at:{type:Date}
})

salesOrderSchema.pre('save',function(next){
    var doc = this;
    counter_schema.findByIdAndUpdate({_id:'entityId'},{$inc:{seq:1}},{new:true,upsert:true}).then(function(count){
        doc.id = count.seq;
        var date = new Date();
        doc.receipt_number = count.seq + date;

        if(!doc.created_at){
            doc.created_at = date;
        }
        //doc.updated_at = date;
        next();
    }).catch(function(err){
        console.error(err);
        throw err;
    });
})

var SalesOrder = mongoose.model('SalesOrder',salesOrderSchema);