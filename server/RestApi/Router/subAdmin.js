const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Admin =require('../model/userSchema')
const { adminAuth} = require('../Auth/auth')
const commonfunction = require('../common/commonfunction')



//create subadmin
router.post('/create-admin',async (req, res) => {

	try{
		Admin.findOne({email:req.body.email,status:{$ne:'Delete'}},async (error,result)=>{
			if(error){
				res.status(500).json({
					statusCode:500,
					message: 'Internal server error',
					error:error
				})
			}
			else if(result){
				res.status(200).json({
					statusCode:409,
					message: 'User Already Exist',
					error:[]
				})
			}
			else{
				let subject = 'Verify Email'
				let body = `Dear User\n\n click on link to verify your email ${req.body.webUrl}. If you have not request for this please ignore this mail\n\nBest Regards`	
				let mail = await commonfunction.sendMail(req.body.email,subject,body)
					  const admin = new Admin(req.body)
					  admin.save().then((result) => {
						  res.status(200).json({
							statusCode:200,
							result: result,
							message: 'Sub Admin Craeted Successfully'
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
// get sub admin list
router.get('/admin-list',adminAuth,async (req, res, next) => {
	Admin.find({status:{$ne:'Delete'}},{userType:{$ne : 'Admin'}},{userType:{$ne : 'User'}})
		.then((result) => {
            if(result.length == 0){
                res.status(200).json({
                    statusCode:404,
                    data: result,
                    totalUser:result.length,
                    message: 'Data not found'
                });

            }
            else if(result){
                res.status(200).json({
                    statusCode:200,
                    data: result,
                    totalUser:result.length,
                    message: 'User list found'
                });
            }
		
		})
		.catch((err) => {
			console.log(err);
			res.status(200).json({
				statusCode:401,
				message: 'Data not found'
			});
			res.status(500).json({
				statusCode:500,
				message: 'Internal server error'
			});
		});
});

module.exports = router