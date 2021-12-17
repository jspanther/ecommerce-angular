const express = require('express')
const router = express.Router()
const Banner = require('../model/bannerSchema')
const {adminAuth} =require('../Auth/auth')
const mongoose =require('mongoose')

//add banner
router.post('/add-banner',adminAuth,async (req,res)=>{
try {
    const banner = new Banner({
        _id: new mongoose.Types.ObjectId,
        bannerImage:req.body.bannerImage
    })
   await banner.save()
   res.status(200).json({
       statusCode:200,
       'message':'Banner added successfully'
   })
} catch (error) {
    console.log(error);
    res.status(500).json({
       
        statusCode:500,
        'message':'Internal server error',
        error:error
    })
}
})

//get all banner
router.get('/banner-list',(req,res)=>{
    Banner.find().then(result=>{
        if (result.length != 0) {
            res.status(200).json({
                statusCode: 200,
                data: result,
                message: 'Banner list found',
                length: result.length       
            });
        }
        else if (result.length == 0) {
            res.status(200).json({
                statusCode: 404,
                data: result,
                message: 'Bannet not found',
                length: result.length 
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error'
        });
    });
})

//get banner by id
router.get('/bannerId=:id',adminAuth, (req, res, next) => {
    Banner.findById(req.params.id).then((result) => {

        res.status(200).json({
            statusCode: 200,
            data: result,
            message: 'data found successfully',
        });
    })
        .catch((err) => {
            res.status(200).json({
                statusCode: 404,
                message: 'Data not found',
                result: err
            });
            res.status(500).json({
                statusCode: 500,
                message: 'Internal server error'
            });
        });

})

//update banner
router.put('/update-banner/:id', adminAuth, (req, res) => {
    Banner.findOneAndUpdate(
        { _id: req.params.id }, { $set: req.body }).then(result => {
            res.status(200).json({
                statusCode: 200,
                data: result,
                message: "Update successfully"
            })
        }).catch(err => {
            res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
                message: err
            })
        })
});

//delete banner
router.delete('/delete-banner/:id',adminAuth, (req, res, next) => {
	Banner.findByIdAndDelete({ _id: req.params.id }).then((result) => {
			res.status(200).json({
                statusCode:200,
				message: 'Product deleted successfully',
				result: result
			});
		})
		.catch((err) => {
			res.status(500).json({
                statusCode:500,
				message: 'Something went wrong',
                error:err

			});
		});
});

module.exports = router