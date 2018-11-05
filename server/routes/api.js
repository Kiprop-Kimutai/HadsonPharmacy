var express = require('express');
var app = express();    
var passport = require('passport');
var jwt = require('express-jwt');
var router = express.Router();
require('../models/db');
require('../config/passport');
var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');

var auth = jwt({
    secret:'MY_SECRET',
    userProperty:'payload'
})


app.use(passport.initialize());
var ProductRoutes = require('./product-routes');
const DeviceRoutes = require('./device-routes');
var PurchaseOrderRoutes = require('./purchase_order_routes');
const ProductCataloguRoutes = require('../routes/product_catalogue-routes');
const SalesRoutes = require('../routes/sales-routes');
var test = require('./test');
var print = require('./print');


app.get('/',(req,res,next)=>{
    res.send("ok...");
})
//profile
router.get('/profile',auth,ctrlProfile.profileRead);
//authentication
app.post('/login',ctrlAuth.login);
app.post('/register',ctrlAuth.register);
app.use('/device_routes',DeviceRoutes);
app.use('/products',ProductRoutes);
app.use('/lpo',PurchaseOrderRoutes);
app.use('/catalogue',ProductCataloguRoutes);
app.use('/sales',SalesRoutes);
app.use('/test',test);
app.use('/print',print);
module.exports = app;