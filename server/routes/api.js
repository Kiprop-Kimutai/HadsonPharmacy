var express = require('express');
var app = express();    
var FirmwareRoutes = require('./firmware-routes');
var ProductRoutes = require('./product-routes');
const DeviceRoutes = require('./device-routes');
var PurchaseOrderRoutes = require('./purchase_order_routes');
const ProductCataloguRoutes = require('../routes/product_catalogue-routes');
const SalesRoutes = require('../routes/sales-routes');
app.get('/',(requestAnimationFrame,res,next)=>{
    res.send("ok...");
})
app.use('/firmware_routes',FirmwareRoutes);
app.use('/device_routes',DeviceRoutes);
app.use('/products',ProductRoutes);
app.use('/lpo',PurchaseOrderRoutes);
app.use('/catalogue',ProductCataloguRoutes);
app.use('/sales',SalesRoutes);
module.exports = app;