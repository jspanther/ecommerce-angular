const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../model/productSchema')
const { adminAuth } = require('../Auth/auth')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})

//add product
router.post('/add-product',adminAuth, (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        productName: req.body.productName,
        description: req.body.description,
        mrp: req.body.mrp,
        category: req.body.category,
        sellingPrice: req.body.sellingPrice,
        disscount: req.body.disscount,
        productImage: req.body.productImage
    })

    //save product details in database
    product.save().then(result => {
        res.status(200).json({
            status:200,
            data: result,
            message:'Product Added'
        });
    }).catch(err => {
        res.status(500).json({
            status:500,
            message: 'Internal server error',
            error:err
        });
    })
})
// })

//get all product
router.get('/product-list', (req, res, next) => {
    Product.find().then((result) => {
        if (result.length != 0) {
            res.status(200).json({
                status: 200,
                message: 'Product list found',
                length: result.length,
                data: result
            });
        }
        else if (result.length == 0) {
            res.status(404).json({
                status: 404,
                message: 'Product not found',
                length: result.length,
                data: result
            });
        }

    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: 500,
                message: 'Internal server error'
            });
        });
});

//getProduct by id
router.get('/productId=:id', (req, res, next) => {
    Product.findById(req.params.id).then((result) => {

        res.status(200).json({
            status: 200,
            data: result,
            message: 'data found successfully',
        });
    })
        .catch((err) => {
            res.status(404).json({
                message: 'Data not found',
                result: err
            });
            res.status(500).json({
                message: 'Internal server error'
            });
        });

})


//upadte product api
router.put('/update-product/:id', adminAuth, (req, res) => {
    Product.findOneAndUpdate(
        { _id: req.params.id }, { $set: req.body }).then(result => {
            res.status(200).json({
                status: 200,
                data: result,
                message: "Update successfully"
            })
        }).catch(err => {
            res.status(500).json({
                status: 500,
                message: err
            })
        })
});

//delete api integration {$set: {status:'Delete'}},{new:true}

router.delete('/delete-product/:id',adminAuth, (req, res, next) => {
	Product.findByIdAndDelete({ _id: req.params.id }).then((result) => {
			res.status(200).json({
                status:200,
				message: 'Product deleted successfully',
				result: result
			});
		})
		.catch((err) => {
			res.status(500).json({
                status:500,
				message: 'Something went wrong',
                error:err

			});
		});
});

module.exports = router