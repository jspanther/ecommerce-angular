// const { Router } = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('./model/student')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email}).exec() 
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message: "User does not exist"
            })
        }

        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{  //compare password 
            if(!result){
                return res.status(401).json({
                    message : 'Unauthourized access'
                })
            }
            if(result){
                const token = jwt.sign({
                    name:user[0].name,
                    email:user[0].email,
                    mobile:user[0].mobile,
                    userType:user[0].userType
                },
                "this is login api",
                {
                    expiresIn:'24h'   //token expired time in hours
                }
                );
                res.status(200).json({
                    name:user[0].name,
                    email:user[0].email,
                    mobile:user[0].mobile,
                    userType:user[0].userType,
                    token:token
                })
            }
        })
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router