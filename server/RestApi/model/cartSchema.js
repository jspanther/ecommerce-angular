const mongoose = require('mongoose')

// const cartSchema = new mongoose.Schema({
//     userId :{   
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'user',
//     },
//     product:
//         {   
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'product',
//         },
//         quantity:{type:Number,default:1},
//         status:{type:String,enum:['Active',"Blocked","Delete"],default:"Active"}

// },
// {timestamps:true}
// )

// module.exports= mongoose.model('cart',cartSchema)


const cartSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: [
        {
          productId: String,
          quantity: Number,
        }
      ],
      
      status:{type:String,enum:['Active',"Blocked","Delete"],default:"Active"},
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("cart", cartSchema);