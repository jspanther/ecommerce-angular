const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    mobile:{type:Number,required:true},
    email:{type:String,required:true},
    adminPermission:{type:Array},
    webUrl:String,
    role:String,
    verified:{type:Boolean,default:false},
    status:{type:String,enum:['Active',"Blocked","Delete"],default:"Active"}

},
{timestamps:true}
)

module.exports = mongoose.model('admin',adminSchema)