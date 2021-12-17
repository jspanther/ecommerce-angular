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
 
router.post('/login',(req,res,next)=>{
    User.findOne({email:req.body.email}).select('+password').exec() 
    .then(user =>{
        
        if(user.userType!='Admin'){
            return res.status(200).json({
                message: "User does not exist"
            })
        }

        bcrypt.compare(req.body.password, user.password,(err,result)=>{  //compare password 
            if(!result){
                return res.status(200).json({
                    status:401,
                    message : 'Unauthourized access'
                })
            }
            if(result){
                const token = jwt.sign({
                    _id:user.id
                },
                "Admin@123",  //secerete key
                {
                    expiresIn:'24h'   //token expired time in hours
                }
                );

                res.status(200).json({
                  status:200,
                    data:{
                    _id: user._id,
                    name:user.name,
                    email:user.email,
                    mobile:user.mobile,
                    userType:user.userType,
                    token:token
                    }
                })
            }
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'Internal server error',
            error:err
        })
    })
})

module.exports = router