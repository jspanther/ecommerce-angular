const express = require('express');
const app = express();
const userRoute = require('./RestApi/Router/user')
const mongoose = require('mongoose'); //add mongoose library
const bodyParser = require('body-parser');
const logInUser = require('./RestApi/Router/login')
const fileUpload = require('express-fileupload')
const productRoute = require('./RestApi/Router/product')
//connect to mongodb cloud
mongoose.connect('mongodb+srv://mohit:Nathues1@cluster0.vof7i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

//if mongodb connection failed
mongoose.connection.on('error',err=>{
    console.log('connection failed');
})

// if mongodb connect successfully
mongoose.connection.on('connected',connected=>{
    console.log('database connected...');
})

app.use(fileUpload({
    useTempFiles:true
})

)

//body-praser
app.use(bodyParser.urlencoded({extended:false})) // to send data by queryparams
app.use(bodyParser.json());
app.use('/student',userRoute)
app.use('/user',logInUser)
app.use('/product',productRoute)


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
})
module.exports=app;