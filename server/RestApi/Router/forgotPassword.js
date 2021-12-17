const express = require('express')
const router = express.Router()
const User = require('../model/userSchema')
const Token = require('../model/tokenSchema')
const commonfunction = require('../common/commonfunction')
const crypto = require('crypto')
const bcrypt= require('bcryptjs')


//forget password api
router.post('/forgot-password', async (req,res)=>{
   try{
     const user = await User.findOne({email:req.body.email});
     console.log("my reset user" , user);
     if(!user){
         return res.status(404).json({
             statusCode : 404,
             message : 'Email id not exist'
         })
     }
     let token = await Token.findOne({userId:user._id});
     if(!token){
        token = await new Token({
            userId : user._id,
            token :crypto.randomBytes(32).toString('hex')
        }).save();
    }
    const link = `${req.body.webUrl}`
     let subject = 'Reset Password'
	 let body = `Dear User\n\n Password reset link is ${link}. If you have not request for this please ignore this mail\n\nBest Regards`
				
	let mail = await commonfunction.sendMail(req.body.email,subject,body)
    res.status(200).json({
        statusCode : 200,
        data:{
            userId:user._id,
            token: token.token
        },
        message : "password reset link sent to your email account"
    })

   }
   catch(err){
       console.log(err);
    res.status(500).json({
        statusCode : 500,
        message : 'Internal Server Error',
        error:err
    })
   }
})

//reset password api
router.post("/reset-password/:id", async (req, res) => {
    try {

        const user = await User.findById({_id:req.params.id});
        
        if (!user) {return res.status(400).json({
            statusCode : 404,
            message : 'User does not exist'
        })
    }

        const token = await Token.findOne({
            userId: user._id,
            token: req.body.token,
        });
        if (!token) return res.status(400).json({
            statusCode : 400,
            message : 'link expired'
        });
    
        user.password = bcrypt.hashSync(req.body.password);
        await user.save();
        await token.delete();
        res.status(200).json({
            statusCode : 200,
            message : 'Password reset sucessfully'
        })
    } 
    catch (error) {
       res.status(500).json({
           statusCode: 500,
           message:'Internal server error'
       })
    }
})

router.post('/change-password/:id',async (req,res)=>{
    try {
        console.log(req.params.id);
        const user = await User.findById({_id:req.params.id}).select('+password').exec() 
        console.log(user);
          if (!user) {
            return res.status(400).json({
            statusCode : 404,
            message : 'User does not exist'
        })
    }

    else{
       
        bcrypt.compare(req.body.oldPassword, user.password,async (err,result)=>{
            if(!result){
                return res.status(401).json({
                    statusCode:401,
                    message : 'Please enter correct password'
                })
            }
            if(result){
                     user.password = bcrypt.hashSync(req.body.newPassword);
                    await user.save();
                    res.status(200).json({
                   statusCode : 200,
                   message : 'Password change sucessfully'
            })
            }
        })
    }

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message:'Internal server error'
        })
    }
})

module.exports = router