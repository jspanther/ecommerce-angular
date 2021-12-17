const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const {auth,adminAuth} = require('../Auth/auth')
const User = require('../model/userSchema')

//get profile
router.get('/get-profile/:id',adminAuth, (req,res)=>{
    try {
        User.findById(req.params.id).then(user=>{
            if(!user){
                res.status(200).json({
                    statusCode:404,
                    message: 'User not found'
                })
            }
            else{
                res.status(200).json({
                    statusCode:200,
                    data:user,
                    message: 'User data found'
                })
            }  
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            statusCode:500,
            message: 'Internal server error'
        })
    }
   
})

//update profile
router.put('/update-profile/:id',(adminAuth||auth),(req,res)=>{
    try {
         User.findOneAndUpdate({_id:req.params.id},	{
			$set: {
				name: req.body.name,
				email: req.body.email,
				mobile: req.body.mobile,
			}
		}
        ).then(result=>{
            if(!result){
                res.status(200).json({
                    statusCode:404,
                    message: 'User not found'
                })
            }
            else{
                res.status(200).json({
                    statusCode:200,
                    data:result,
                    message: 'Updated successfully'
                })
            } 
        })
   
    } catch (error) {
        res.status(500).json({
            statusCode:500,
            data:result,
            message: 'Internal server error'
        })
    }

})

module.exports = router