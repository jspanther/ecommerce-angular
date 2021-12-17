const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
    userId :{type:String, required:true},
    product:[
        {
            productId:{type:String,required:true},
            quantity:{types:Number,default:1}
        }
    ],
    amount:{type:Number,required:true},
    address: {type:Object, required:true},
    orderStatus: {type:String,default:'Pending'}
},
{timestamps:true}
)

module.exports= mongoose.model('order',orderSchema)