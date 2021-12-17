// const { Router } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
	next();
})
 
router.post('/login',(req,res)=>{
   try{
    User.find({email:req.body.email}).select('+password').exec().then(user =>{
        if(user.length < 1){
            return res.status(200).json({
                statusCode:401,
                message: "Inavlid Credential"
            })
        }
         if(!user[0].Verified){
           return res.status(200).json({
                statusCode:403,
                message : 'Please Verify your email'
            })
        }
        else{
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{  //compare password 
            if(!result){
                return res.status(200).json({
                    statusCode:401,
                    message : 'Unauthourized access'
                })
            }
            if(result){
                const token = jwt.sign({
                    _id:user[0].id
                },
                "Mohit@123",  //secerete key
                {
                    expiresIn:'24h'   //token expired time in hours
                }
                );
                res.status(200).json({
                    statusCode:200,
                    data:{
                    name:user[0].name,
                    email:user[0].email,
                    mobile:user[0].mobile,
                    userType:user[0].userType,
                    token:token
                    }
                })
            }
        })
    }
    })
}
    catch(err){
        res.status(500).json({
            statusCode:500,
            message : 'internal server error',
            error:err
        })
    }
})

module.exports = router