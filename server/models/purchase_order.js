var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost:27017/pbu_tms",{useNewUrlParser:true});
var Schema = mongoose.Schema;


//create auto-increment counter
var counterSchema  = new Schema({
    _id:{type:String,require:true},
    seq:{type:Number,default:0}
})
var Purchase_OrderCounterSchema = mongoose.model("Purchase_OrderSchema",counterSchema);

var Purchase_OrderSchema = new Schema({
    id:Number,
    invoice_no:String,
    status:String,
    ordered_by:String,
    description:String,
    supplier:String,
    po_number:String,
    date:Date,
    raised_by:String,
    products:Array,
    created_at:Date,
    updated_at:Date
})

Purchase_OrderSchema.pre('save',function(next){
    var doc = this;
    Purchase_OrderCounterSchema.findByIdAndUpdate({_id:'entityId'},{$inc:{seq:1}},{new:true,upsert:true}).then(function(count){
        doc.id = count.seq;
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

//var PurchaseOrder = mongoose.model('PurchaseOrder',Purchase_OrderSchema);
//module.exports = PurchaseOrder;
mongoose.model('PurchaseOrder',Purchase_OrderSchema);

