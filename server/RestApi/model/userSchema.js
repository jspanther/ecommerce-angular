const mongoose= require('mongoose')

const userSchema =new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    mobile:Number,
    password:{
        type: String,
        select: false
    },
    userType:String
})

module.exports = mongoose.model('user',userSchema)