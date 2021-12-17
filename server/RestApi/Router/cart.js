const mongoose= require('mongoose')
const express = require('express')
const router = express.Router()
const Cart = require('../model/cartSchema')
const {auth} = require('../Auth/auth')
const User = require('../model/userSchema')
const Product = require('../model/productSchema')

// //add items into cart
// router.post('/add-cart/:id',async (req,res)=>{
    
//     try{
//     const user = await User.findOne({_id:req.params.id})
   
//     const product = await Product.findById({_id:req.body.productId})
//     const cartItem = new Cart({
//         userId:user._id,
//         product:product._id,
//         quantity:1,
//     })
//         //save product details in database
//         cartItem.save()
//         res.status(200).json({
//             statusCode:200,
//             data: {
//                 product:cartItem
//             },
//             message:'Item added successfully'
//         });
 
// }catch(err){
//         console.log(err);
//         res.status(500).json({
//             statusCode:500,
//             message: 'Internal server error',
//             error:err
//           });
//     }
// })

//get item of cart
router.get('/:id',(req,res,next)=>{
   
    Cart.findById(req.params.id).then((result)=>{
        console.log(result);
        res.status(200).json({
            statusCode:200,
            data:result,
            message:'Data found'
        })
    }).catch(err=>{
        res.status(500).json({
            status:500,
            message:"Something Went Wrong",
            error:err
        })
    })
})


//add item into cart
router.post('/add-cart/:id',async (req,res)=>{
    try {
       
        let cart = await Cart.findOne({userId:req.params.id});
        

      if(cart){
        const { productId, quantity} = req.body.products[0];
        console.log('product',productId);
          cart.products.forEach(p =>{
           
           if( p.productId == productId){
            return res.status(404).json({
                statusCode:404,
                message:"Product already in cart"
            })
           }
           else {
            //product does not exists in cart, add new item
            console.log("before push called");
            cart.products.push({productId, quantity});
            console.log("after push called");
            cart.save().then(result=>{
                return res.status(200).json({
                    statusCode:200,
                    data:result,
                    message:'Item added into cart'
                })
            })
          }
          } );
        //   console.log("called ", itemIndex);
    //   if (itemIndex > -1) {
    //     //product exists in the cart, update the quantity
    //     let productItem = cart.products[itemIndex];
    //     productItem.quantity = quantity;
    //     cart.products[itemIndex] = productItem;
      } 
    else{
           //no cart for user, create new cart
      const newCart = await Cart.create({
        userId:req.params.id,
        products: [{ productId:req.body.products[0].productId, quantity:req.body.products[0].quantity}]
      });

      return res.status(200).json({
        statusCode:200,
        message:'Item added into cart'
    })
    }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status:500,
            message:"Something Went Wrong",
            error:err
        })
    }

})


module.exports = router