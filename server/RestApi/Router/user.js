const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt= require('bcrypt')
const auth = require('../Auth/auth')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
	cloud_name: 'nathues', 
	api_key: '624857266517746', 
	api_secret: 'Qo30wcF5FWUdSS_D-8h-YHv7VXk',
	secure: true
  });

//get all user
router.get('/',auth, (req, res, next) => {
	User.find()
		.then((result) => {
			res.status(200).json({
				data: result
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(401).json({
				message: 'Data not found'
			});
			res.status(500).json({
				message: 'Internal server error'
			});
		});
});

//get user by id

router.get('/:id',auth, (req, res, next) => {
	User.findById(req.params.id)
		.then((result) => {
			res.status(200).json({
				data: result,
				message: 'data found'
			});
		})
		.catch((err) => {
			res.status(405).json({
				message: 'Data not found',
				result: err
			});
			res.status(500).json({
				message: 'Internal server error'
			});
		});
});

//create new user
router.post('/', (req, res, next) => {
	// const file = req.files.image
	// cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
	// 	console.log(result.url);
	// })
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
      res.status(500).json({
        error:err
      })
    }
    else{
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hash,
        userType:req.body.userType
      });
      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            newUser: result
          });
        })
        .catch((err) => {
          console.log(err);
    
          res.status(500).json({
            message: 'Internal server error'
          });
        });
    }
  })

});

//delete user by id
router.delete('/:id',auth, (req, res, next) => {
	User.remove({ _id: req.params.id })
		.then((result) => {
			res.status(200).json({
				message: 'User deleted successfully',
				result: result
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: err
			});
		});
});

//update user

router.put('/:id',auth, (req, res, next) => {
	User.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				name: req.body.name,
				email: req.body.email,
				mobile: req.body.mobile,
				password: req.body.password
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
module.exports = router;
