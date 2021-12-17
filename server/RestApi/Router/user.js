const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt= require('bcryptjs')
const { adminAuth} = require('../Auth/auth')
const commonfunction = require('../common/commonfunction')


//get all user
router.get('/user-list',adminAuth,async (req, res, next) => {
	// let admin = await User.findOne({_id:req.userId,userType:'Admin'})
	let admin = await User.findOne({userType:'Admin'})

	if(!admin){
		return res.status(404).json({
			statusCode:404,
			message:"Admin not found"
		})
	}
	// console.log(admin)
	User.find({status:{$ne:'Delete'},userType:{$ne:'Admin'}})
		.then((result) => {
			res.status(200).json({
				statusCode:200,
				data: result,
				totalUser:result.length,
				message: 'User list found'
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(401).json({
				statusCode:401,
				message: 'Data not found'
			});
			res.status(500).json({
				statusCode:500,
				message: 'Internal server error'
			});
		});
});

//get user by id

router.get('/userId=:id',adminAuth, (req, res, next) => {
	User.findById(req.params.id)
		.then((result) => {
			res.status(200).json({
				statusCode:200,
				data: result,
				message: 'User list found'
			});
		})
		.catch((err) => {
			res.status(405).json({
				statusCode:405,
				message: 'Data not found',
				result: err
			});
			res.status(500).json({
				statusCode:500,
				message: 'Internal server error'
			});
		});
});

//create new user
router.post('/create-user',async (req, res) => {

	try{
		User.findOne({email:req.body.email,status:{$ne:'Delete'}},async (error,result)=>{
			if(error){
				res.status(500).json({
					statusCode:500,
					message: 'Internal server error',
					error:error
				})
			}
			else if(result){
				res.status(409).json({
					statusCode:409,
					message: 'User Already Exist',
					error:[]
				})
			}
			else{
				req.body.password = bcrypt.hashSync(req.body.password)
				req.body.otp = commonfunction.generateOTP()
				req.body.otpExpiredTime = Date.now()
				let subject = 'Verify Email'
				let body = `Dear User\n\n click on link to verify your email ${req.body.webUrl}. If you have not request for this please ignore this mail\n\nBest Regards`
				
				let mail = await commonfunction.sendMail(req.body.email,subject,body)
			
					  const user = new User(req.body)
					  user.save().then((result) => {
						  res.status(200).json({
							statusCode:200,
							message: 'User Craeted Successfully',
							result: result
						  });
						})
						.catch((err) => {					
						  res.status(500).json({
							statusCode:500,
							message: 'Internal server error',
							error:err
						  });
						});
				  }
		})
	}
	catch(err){
		res.status(500).json({
			statusCode:500,
			message: 'Internal server error',
			error:err
		})
		console.log(err);
	}
	
});

//delete user by id
router.delete('/delete-user/:id', (req, res, next) => {
	User.findOneAndUpdate({ _id: req.params.id },{$set: {status:'Delete'}},{new:true})
		.then((result) => {
			res.status(200).json({
				statusCode:200,
				message: 'User deleted successfully',
			});
		})
		.catch((err) => {
			res.status(500).json({
				statusCode:500,
				message:'Internal server error',
				error: err
			});
		});
});

//update user

router.put('/update-user/:id',adminAuth, (req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				name: req.body.name,
				email: req.body.email,
				mobile: req.body.mobile,
				
			}
		}
	).then(result=>{
    res.status(200).json({
      data:result,
      message:"Update successfully"
    })
  }).catch(err=>{
    res.status(500).json({
      message:err
    })
  })
});

//verify email

router.post('/verify-user/:id', async (req,res,next)=>{
	try{
		const user = await User.findOne({_id:req.params.id})
		if(!user){
			res.status(400).json({
				statusCode:400,
				message:"User not found"
			})
		}
			if(user.Verified){
				res.status(404).json({
					statusCode:404,
					message:"User already verified"
				})
			}
			else{
				user.Verified = req.body.Verified;
				await user.save();
				res.status(200).json({
					statusCode : 200,
					message: 'User Verified Successfully'
				})
			}
	

	}
	catch(err){
		res.status(500).json({
			statusCode : 500,
			message : 'Internal server error',
			error : err
		})
	}
	
})


module.exports = router;

