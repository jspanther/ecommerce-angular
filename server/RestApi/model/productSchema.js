const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productName:String,
    category:String,
    description:String,
    mrp:Number,
    sellingPrice:Number,
    disscount:Number,
    productImage:String
},
{timestamps:true}
)

module.exports = mongoose.model('product',productSchema)