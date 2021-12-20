const express = require('express');
const app = express();
const userRoute = require('./RestApi/Router/user')
const mongoose = require('mongoose'); //add mongoose library
const bodyParser = require('body-parser');
const logInUser = require('./RestApi/Router/login')
const fileUpload = require('express-fileupload')
const productRoute = require('./RestApi/Router/product')
const cartRoute = require('./RestApi/Router/cart')
const adminLogin=require('./RestApi/Router/admin-login')
const uploadImage = require('./RestApi/Router/upload-image')
const setPassword = require('./RestApi/Router/forgotPassword')
const bannerRoute = require('./RestApi/Router/banner')
const profileRoute = require('./RestApi/Router/profile')
const adminRoute = require('./RestApi/Router/subAdmin')
const staticContentRoute = require('./RestApi/Router/static-content')
//connect to mongodb cloud
// mongoose.connect('mongodb+srv://mohit:Nathues1@cluster0.vof7i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


mongoose.connect('mongodb://localhost/Ecommerce');



//if mongodb connection failed
mongoose.connection.on('error',err=>{
    console.log('connection failed');
})

// if mongodb connect successfully
mongoose.connection.on('connected',connected=>{
    console.log('database connected...');
})
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(fileUpload({
    useTempFiles:true
})

)

//body-praser
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({extended:false})) // to send data by queryparams
app.use(bodyParser.json());
app.use('/user',userRoute)
app.use('/user',logInUser)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/admin',adminLogin)
app.use('/upload-image',uploadImage)
app.use('/password',setPassword)
app.use('/banner',bannerRoute)
app.use('/profile',profileRoute)
app.use('/static-content',staticContentRoute)
app.use('/admin',adminRoute)

app.use((req,res,next)=>{
    res.status(404).json({
        statusCode: 404,
        error:'bad request'
    })
})
module.exports=app;