const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../model/productSchema')
const cloudinary = require('cloudinary').v2


//connect cloudinary database
cloudinary.config({ 
	cloud_name: 'nathues', 
	api_key: '624857266517746', 
	api_secret: 'Qo30wcF5FWUdSS_D-8h-YHv7VXk',
	secure: true
  });

//add product
router.post('/add-product',(req,res,next)=>{
    const file = req.files.image
	cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
		console.log(result);
      
    const product = new Product({
        _id:new mongoose.Types.ObjectId,
        productName:req.body.productName,
        description:req.body.description,
        mrp:req.body.mrp,
        sellingPrice:req.body.sellingPrice,
        disscount:req.body.disscount,
        productImage:result.url
    })
    //save product details in database
    product.save().then(result=>{
        res.status(200).json({
            data: result
        });
    }).catch(err=>{
        res.status(500).json({
            message: 'Internal server error'
          });
    })
})
})


//get all product
router.get('/product-list',(req,res,next)=>{

})

//getProduct by id
router.get('/:id',(req,res,next)=>{

})

module.exports=router