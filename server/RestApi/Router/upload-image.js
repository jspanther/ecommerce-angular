const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2;


//connect cloudinary database
cloudinary.config({ 
	cloud_name: 'nathues', 
	api_key: '624857266517746', 
	api_secret: 'Qo30wcF5FWUdSS_D-8h-YHv7VXk',
	secure: true
  });

router.post('/',(req,res)=>{
	const file = req.files.image
	// console.log("Files upload" +file);
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
		try{

			res.status(200).json({
				statusCode:200,
				// data:res.body.image,
				message:'Image uploaded successfully'
			})
		}
		catch(err){
			res.status(500).json({
				statusCode:500,
				message:'Something went wrong',
				error:err
			})
		}
	console.log(result);
})

})
module.exports = router;