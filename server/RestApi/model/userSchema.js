const mongoose= require('mongoose')
var bcrypt = require('bcryptjs');
const userSchema =new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:{ type:String},
    mobile:String,
    password:{ type: String,select:false},
    userType:{  type:String,enum:['Admin',"User"],default:'User'},
// otp:String,
// otpExpiredTime:Number,
webUrl:String,

Verified:{type:Boolean,default:false},
status:{type:String,enum:['Active',"Blocked","Delete"],default:"Active"}
},
{timestamps:true}
)

module.exports = mongoose.model('user',userSchema)


mongoose.model('user',userSchema).findOne({userType:'Admin',
status:'Active'
},
(error,result)=>{
    if(error){
        console.log('Internal Server Error');
    }
    else if(result){
        console.log('dafault Admin already created');
    }
    else{
        let obj = {
            name:'Mohit',
            email:'mohit12@mailinator.com',
            mobile:'7007353692',
            password:bcrypt.hashSync('Mohit@123'),
            userType:'Admin',
            // otp:'1234',
            webUrl:'String',
            otpExpiredTime:Date.now(),
            Verified:true,
            status:"Active" 
        }
        mongoose.model('user',userSchema).create(obj,(saveError, saveResult)=>{
            if(saveError){
                console.log('Internal Server Error addd',saveError);
            }
            else{
                console.log('Default admin craeted ',saveResult);
            }
        })
    }
}
)