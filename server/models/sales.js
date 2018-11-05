var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
    _id:{type:String,require:true},
    seq:{type:Number,default:0}
}
)

var sales_counter = mongoose.model('sales_counter',counterSchema);

var salesSchema = new Schema({
    id:{type:Number,unique:true},
    receipt_number:{type:String,unique:true},
    cashier:{type:String},
    cash:{type:Number},
    amount:{type:Number},
    profit:{type:Number},
    name:{type:String},
    balance:{type:Number},
    created_at:{type:Date}
})

salesSchema.pre('save',function(next){
    var doc = this;
    sales_counter.findByIdAndUpdate({_id:'entityId'},{$inc:{seq:1}},{new:true,upsert:true}).then(function(count){
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

//var Sales = mongoose.model('Sales',salesSchema);
//module.exports = Sales;
mongoose.model('Sales',salesSchema);