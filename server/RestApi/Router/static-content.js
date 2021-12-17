const express = require('express')
const router = express.Router()
const StaticContent = require('../model/staticContentSchema')
const {adminAuth} =require('../Auth/auth')
const mongoose =require('mongoose')

//craete Static Content

router.post('/create-static',(req,res)=>{
    const staticContent = new StaticContent({
        _id:new mongoose.Types.ObjectId,
        pageKey:req.body.pageKey,
        data:req.body.data
    })

    staticContent.save().then(result=>{
        res.status(200).json({
            statusCode:200,
            data:result,
            message:'data found'
        })
    }).catch(err => {
        res.status(500).json({
            status:500,
            message: 'Internal server error',
            error:err
        });
    })
})

//get all banner
router.get('/get-static',(req,res)=>{
    StaticContent.find().then(result=>{
        if (result.length != 0) {
            res.status(200).json({
                statusCode: 200,
                data: result,
                message: 'Static list found',
                length: result.length       
            });
        }
        else if (result.length == 0) {
            res.status(200).json({
                statusCode: 404,
                data: result,
                message: 'Banner not found',
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

//get content by pageKey
router.get('/pageKey=:id',adminAuth, (req, res, next) => {
    StaticContent.findOne({pageKey:req.params.id}).then((result) => {

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
router.put('/update-static/:id', adminAuth, (req, res) => {
    StaticContent.findOneAndUpdate(
        { pageKey: req.params.id }, { $set: req.body }).then(result => {
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
router.delete('/delete-static/:id',adminAuth, (req, res, next) => {
	StaticContent.findByIdAndDelete({ pageKey: req.params.id }).then((result) => {
			res.status(200).json({
                statusCode:200,
				message: 'Deleted successfully',
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