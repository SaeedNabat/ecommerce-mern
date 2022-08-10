const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

//create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user.id;
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
  } catch (error){
    console.log(error);
  };
});

// display all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req,res,next)=>{
    const resPerPage = 2;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find() ,req.query).search().filter().pagination(resPerPage)
    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resPerPage);
     products = await apiFeatures.query.clone();
    return res.status(200).json({
        success:true,
        filteredProductsCount, 
        products,
        resPerPage,
        productsCount
    })
})

// display single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res,next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
         return next(new ErrorHandler(
            'product not found',
            404
         ));
        }
        res.status(200).json({
            success:true,
            product
    });
    } catch (error){
        console.log(error.message);
    }
})

// update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).json({
                success:false,
                message:'product not found'
            })
        }
          product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            useValidators:true,
            useFindAndModify:false

        });
        res.status(200).json({success:true,product});
    } catch (err) {
        res.status(500).json({success:false,message:err.message});
    }
})

// delete product => /api/v1/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message:'product not found'
            })
            
        } 

        await product.remove();
        res.status(200).json({success:true,
            message:"product deleted successfully"
        });

    })
// create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req,res, next)=>{
    const {rating , comment, productId} = req.body;
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(r=>r.user.toString()=== req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach(review =>{
            review.comment = comment;
            review.rating = rating;
        })
       
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    product.rating = product.reviews.reduce((acc,item)=>item.rating+acc,0) / product.reviews.length;
    await product.save({
        validateBeforeSave:false
    });
    res.status(200).json({
        success:true
    })

})
// get product reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res,next) =>{
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})
// delete product review => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res,next) =>{
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());
    const numOfReviews = reviews.length;
    const ratings = product.reviews.reduce((acc,item) => item.rating+acc,0)/reviews.length
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
    });
});