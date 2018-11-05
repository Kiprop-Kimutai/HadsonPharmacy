var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product_catalogue_schema = new Schema({
    code:{type:String,unique:true},
    generic_name:{type:String,unique:true},
    name:{type:String,unique:true},
    created_at:Date,
    updated_at:Date
})

//set date before creation and update
product_catalogue_schema.pre('save',function(next,err){
    var doc = this;
    var date = new Date();
    if(!doc.created_at){
        doc.created_at = date;
    }
    doc.updated_at = date;
    next();
    if(err){
        //console.error(err);
        //throw err;
    }
})

//var ProductCatalogue = mongoose.model('ProductCatalogue',product_catalogue_schema);
//module.exports = ProductCatalogue;
mongoose.model('ProductCatalogue',product_catalogue_schema);


