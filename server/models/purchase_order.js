var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import {ProductModel} from './product-model';


//create auto-increment counter
var counterSchema  = new Schema({
    _id:{type:String,require:true},
    seq:{type:Number,default:0}
})
var Purchase_OrderSchema = mongoose.model("Purchase_OrderSchema",counterSchema);

var Purchase_OrderSchema = new Schema({
    id:{type:Number,unique:true},
    ordered_by:{type:String},
    description:{type:String},
    supplier:{type:String},
    po_number:{type:String,unique:true},
    Date:{type:Date},
    raised_by:{type:String},
    product:{type:ProductModel},
    created_at:{type:Date},
    updated_at:{type:Date}
})

Purchase_OrderSchema.pre('save',function(next){
    var doc = this;
    counterSchema.findByIdAndUpdate({_id:'entityId'},{$inc:{seq:1}},{new:true,upsert:true}).then(function(count){
        doc.product_id = count.seq;
        var date = new Date();

        if(!doc.created_at){
            doc.created_at = date;
        }
        doc.updated_at = date;
        next();
    }).catch(function(err){
        console.error(err);
        throw err;
    });
})

var PurchaseOrder = mongoose.model('PurchaseOrder',Purchase_OrderSchema);
module.exports = PurchaseOrder;

