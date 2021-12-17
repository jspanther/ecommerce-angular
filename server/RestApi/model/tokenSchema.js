const mongoose = require('mongoose')
const tokenSchema = new mongoose.Schema({
    userId:{type:String,required:true,ref:'user'},
    token : {type:String,required:true},


},
{timestamps:true}
)
module.exports =  mongoose.model('token',tokenSchema)